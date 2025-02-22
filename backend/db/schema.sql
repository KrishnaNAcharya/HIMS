-- Create insurance schema
CREATE SCHEMA IF NOT EXISTS insurance;

-- Create tables in insurance schema
CREATE TABLE IF NOT EXISTS insurance.personal_info (
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    occupation VARCHAR(100),
    income_range VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS insurance.address (
    address_id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES insurance.personal_info(person_id) ON DELETE CASCADE,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pin_code VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS insurance.coverage (
    coverage_id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES insurance.personal_info(person_id) ON DELETE CASCADE,
    plan_type VARCHAR(50),
    coverage_amount DECIMAL,
    payment_method VARCHAR(50),
    payment_frequency VARCHAR(50),
    additional_benefits TEXT[]
);

CREATE TABLE IF NOT EXISTS insurance.family_members (
    member_id SERIAL PRIMARY KEY,
    coverage_id INTEGER REFERENCES insurance.coverage(coverage_id) ON DELETE CASCADE,
    name VARCHAR(200),
    relation VARCHAR(50),
    age INTEGER,
    gender VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS insurance.health_info (
    health_id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES insurance.personal_info(person_id) ON DELETE CASCADE,
    height DECIMAL,
    weight DECIMAL,
    has_existing_conditions BOOLEAN,
    existing_conditions TEXT[],
    smoking_status VARCHAR(20),
    family_history TEXT[],
    exercise_frequency VARCHAR(50),
    alcohol_consumption VARCHAR(50),
    taking_medications BOOLEAN,
    medications TEXT[]
);
