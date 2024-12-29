import { pool } from '../config/db.js';

export const testDbConnection = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
};

export const submitInsuranceForm = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log('Received form data:', JSON.stringify(req.body, null, 2));

    if (!req.body.personalInfo || !req.body.healthInfo || !req.body.coverage) {
      throw new Error('Missing required form sections');
    }

    const dateOfBirth = new Date(req.body.personalInfo.dateOfBirth);
    const ageInMs = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(ageInMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18) {
      throw new Error('Applicant must be at least 18 years old');
    }

    if (
      req.body.coverage.additionalBenefits &&
      req.body.coverage.additionalBenefits.includes('maternity cover') &&
      req.body.personalInfo.gender !== 'female'
    ) {
      throw new Error('Maternity Cover can only be selected by female applicants');
    }

    const numericFields = [
      { value: req.body.healthInfo.height, name: 'Height' },
      { value: req.body.healthInfo.weight, name: 'Weight' },
    ];

    for (const field of numericFields) {
      if (field.value < 0) {
        throw new Error(`${field.name} cannot be negative`);
      }
    }

    const personInfo = {
      firstName: req.body.personalInfo.firstName || null,
      lastName: req.body.personalInfo.lastName || null,
      email: req.body.personalInfo.email || null,
      phone: req.body.personalInfo.phone || null,
      dateOfBirth: req.body.personalInfo.dateOfBirth || null,
      gender: req.body.personalInfo.gender || null,
      occupation: req.body.personalInfo.occupation || null,
      incomeRange: req.body.personalInfo.incomeRange || null
    };

    const personalInfoResult = await client.query(
      `INSERT INTO insurance.personal_info 
       (first_name, last_name, email, phone, date_of_birth, gender, occupation, income_range)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING person_id`,
      Object.values(personInfo)
    ).catch(err => {
      console.error('Error inserting personal info:', err);
      throw new Error(`Database error: ${err.message}`);
    });

    const personId = personalInfoResult.rows[0].person_id;

    await client.query(
      `INSERT INTO insurance.address 
       (person_id, street, city, state, pin_code)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        personId,
        req.body.address.street,
        req.body.address.city,
        req.body.address.state,
        req.body.address.pinCode
      ]
    );

    const coverageResult = await client.query(
      `INSERT INTO insurance.coverage 
       (person_id, plan_type, coverage_amount, payment_method, payment_frequency, additional_benefits)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING coverage_id`,
      [
        personId,
        req.body.coverage.planType,
        req.body.coverage.coverageAmount,
        req.body.coverage.paymentMethod,
        req.body.coverage.paymentFrequency,
        req.body.coverage.additionalBenefits
      ]
    );

    const coverageId = coverageResult.rows[0].coverage_id;

    if (req.body.coverage.familyMembers && req.body.coverage.familyMembers.length > 0) {
      const familyMemberValues = req.body.coverage.familyMembers.map(member => 
        `(${coverageId}, '${member.name}', '${member.relation}', ${member.age}, '${member.gender}')`
      ).join(',');

      await client.query(
        `INSERT INTO insurance.family_members 
         (coverage_id, name, relation, age, gender)
         VALUES ${familyMemberValues}`
      );
    }

    await client.query(
      `INSERT INTO insurance.health_info 
       (person_id, height, weight, has_existing_conditions, existing_conditions, 
        smoking_status, family_history, exercise_frequency, alcohol_consumption, 
        taking_medications, medications)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        personId,
        req.body.healthInfo.height,
        req.body.healthInfo.weight,
        req.body.healthInfo.hasExistingConditions,
        req.body.healthInfo.existingConditions,
        req.body.healthInfo.smokingStatus,
        req.body.healthInfo.familyHistory,
        req.body.healthInfo.exerciseFrequency,
        req.body.healthInfo.alcoholConsumption,
        req.body.healthInfo.takingMedications,
        req.body.healthInfo.medications
      ]
    );

    await client.query('COMMIT');
    res.json({ success: true, message: 'Insurance application submitted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Detailed error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting insurance application', 
      error: error.message
    });
  } finally {
    client.release();
  }
};

export const getTableRecords = async (req, res) => {
  const client = await pool.connect();
  try {
    const { table } = req.params;
    const validTables = ['personal_info', 'address', 'coverage', 'family_members', 'health_info'];
    if (!validTables.includes(table)) {
      throw new Error('Invalid table name');
    }
    
    const result = await client.query(`SELECT * FROM insurance.${table}`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

export const deleteRecord = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { table, id } = req.params;
    
    console.log(`Attempting to delete from ${table} with id ${id}`);

    switch (table) {
      case 'personal_info':
        const coverageIds = await client.query(
          'SELECT coverage_id FROM insurance.coverage WHERE person_id = $1',
          [id]
        );
        
        if (coverageIds.rows.length > 0) {
          const ids = coverageIds.rows.map(row => row.coverage_id);
          await client.query(
            'DELETE FROM insurance.family_members WHERE coverage_id = ANY($1)',
            [ids]
          );
        }

        await client.query('DELETE FROM insurance.health_info WHERE person_id = $1', [id]);
        await client.query('DELETE FROM insurance.coverage WHERE person_id = $1', [id]);
        await client.query('DELETE FROM insurance.address WHERE person_id = $1', [id]);
        await client.query('DELETE FROM insurance.personal_info WHERE person_id = $1', [id]);
        break;

      case 'coverage':
        await client.query('DELETE FROM insurance.family_members WHERE coverage_id = $1', [id]);
        await client.query('DELETE FROM insurance.coverage WHERE coverage_id = $1', [id]);
        break;

      case 'health_info':
        await client.query('DELETE FROM insurance.health_info WHERE health_id = $1', [id]);
        break;

      case 'address':
        await client.query('DELETE FROM insurance.address WHERE address_id = $1', [id]);
        break;

      case 'family_members':
        await client.query('DELETE FROM insurance.family_members WHERE member_id = $1', [id]);
        break;

      default:
        throw new Error('Invalid table name');
    }

    await client.query('COMMIT');
    res.json({ 
      success: true, 
      message: `Record deleted successfully from ${table}` 
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting record:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

export const updateRecord = async (req, res) => {
  const client = await pool.connect();
  try {
    const { table, id } = req.params;
    const updates = req.body;

    console.log(`Attempting to update ${table} with id ${id}`);

    const validTables = ['personal_info', 'address', 'coverage', 'family_members', 'health_info'];
    if (!validTables.includes(table)) {
      throw new Error('Invalid table name');
    }

    const setClause = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(updates);

    await client.query(`UPDATE insurance.${table} SET ${setClause} WHERE ${table === 'personal_info' ? 'person_id' : table === 'address' ? 'address_id' : table === 'coverage' ? 'coverage_id' : table === 'family_members' ? 'member_id' : 'health_id'} = $${values.length + 1}`, [...values, id]);

    res.json({ success: true, message: `Record updated successfully in ${table}` });
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};