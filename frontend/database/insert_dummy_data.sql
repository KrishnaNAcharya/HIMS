-- Drop existing tables if they exist
DROP TABLE IF EXISTS billing;
DROP TABLE IF EXISTS claim;
DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS disease;
DROP TABLE IF EXISTS hospital;
DROP TABLE IF EXISTS policy;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS personal_info;

-- Create personal_info table
CREATE TABLE personal_info (
  person_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  password VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  status VARCHAR(20) NOT NULL
);

-- Create address table
CREATE TABLE address (
  address_id SERIAL PRIMARY KEY,
  person_id INT REFERENCES personal_info(person_id),
  street VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  pin_code VARCHAR(10) NOT NULL
);

-- Create policy table
CREATE TABLE policy (
  policy_id SERIAL PRIMARY KEY,
  person_id INT REFERENCES personal_info(person_id),
  policy_number VARCHAR(50) UNIQUE NOT NULL,
  policy_type VARCHAR(50) NOT NULL,
  sum_insured DECIMAL(10, 2) NOT NULL,
  tenure INT NOT NULL,
  premium DECIMAL(10, 2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  policy_benefits TEXT,
  medical_history TEXT
);

-- Create hospital table
CREATE TABLE hospital (
  hospital_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  is_networked BOOLEAN NOT NULL
);

-- Create disease table
CREATE TABLE disease (
  disease_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  code VARCHAR(20) UNIQUE NOT NULL,
  infected_from DATE,
  diagnosis_date DATE
);

-- Create test table
CREATE TABLE test (
  test_id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  disease_code VARCHAR(20) REFERENCES disease(code),
  price DECIMAL(10, 2) NOT NULL
);

-- Create claim table
CREATE TABLE claim (
  claim_id SERIAL PRIMARY KEY,
  policy_number VARCHAR(50) REFERENCES policy(policy_number),
  person_id INT REFERENCES personal_info(person_id),
  issued_amount DECIMAL(10, 2) NOT NULL,
  issued_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  claimed_amount DECIMAL(10, 2) NOT NULL
);

-- Create billing table
CREATE TABLE billing (
  billing_id SERIAL PRIMARY KEY,
  disease_code VARCHAR(20) REFERENCES disease(code),
  bill_amount DECIMAL(10, 2) NOT NULL,
  date_of_admission DATE NOT NULL,
  date_of_discharge DATE
);

-- Insert dummy data into personal_info table
INSERT INTO personal_info (first_name, last_name, email, phone, password, date_of_birth, status)
VALUES 
('John', 'Doe', 'john.doe@example.com', '1234567890', 'password123', '1980-01-01', 'active'),
('Jane', 'Smith', 'jane.smith@example.com', '0987654321', 'password456', '1990-02-02', 'inactive');

-- Insert dummy data into address table
INSERT INTO address (person_id, street, city, state, pin_code)
VALUES 
(1, '123 Main St', 'Anytown', 'Anystate', '12345'),
(2, '456 Elm St', 'Othertown', 'Otherstate', '67890');

-- Insert dummy data into policy table
INSERT INTO policy (person_id, policy_number, policy_type, sum_insured, tenure, premium, start_date, end_date, policy_benefits, medical_history)
VALUES 
(1, 'POL123456', 'individual', 100000.00, 5, 500.00, '2023-01-01', '2028-01-01', 'Basic health coverage', 'None'),
(2, 'POL654321', 'family', 200000.00, 10, 1000.00, '2023-02-01', '2033-02-01', 'Comprehensive health coverage', 'Asthma');

-- Insert dummy data into hospital table
INSERT INTO hospital (name, address, is_networked)
VALUES 
('General Hospital', '789 Oak St, Anytown, Anystate', true),
('Specialty Clinic', '101 Pine St, Othertown, Otherstate', false);

-- Insert dummy data into disease table
INSERT INTO disease (name, code, infected_from, diagnosis_date)
VALUES 
('Flu', 'FLU123', '2023-01-15', '2023-01-20'),
('Asthma', 'AST456', '2022-12-01', '2022-12-05');

-- Insert dummy data into test table
INSERT INTO test (code, disease_code, price)
VALUES 
('TEST001', 'FLU123', 50.00),
('TEST002', 'AST456', 75.00);

-- Insert dummy data into claim table
INSERT INTO claim (policy_number, person_id, issued_amount, issued_date, status, claimed_amount)
VALUES 
('POL123456', 1, 5000.00, '2023-03-01', 'approved', 6000.00),
('POL654321', 2, 10000.00, '2023-04-01', 'pending', 12000.00);

-- Insert dummy data into billing table
INSERT INTO billing (disease_code, bill_amount, date_of_admission, date_of_discharge)
VALUES 
('FLU123', 200.00, '2023-01-15', '2023-01-20'),
('AST456', 300.00, '2022-12-01', '2022-12-05');