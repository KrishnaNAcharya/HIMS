-- Create the database (run this first)
CREATE DATABASE insurance_db;

-- Then connect to the database
\c insurance_db;

-- Create tables with schema
CREATE SCHEMA insurance;

-- Personal Information
CREATE TABLE insurance.personal_info (
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    occupation VARCHAR(100) NOT NULL,
    income_range VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Address Information
CREATE TABLE insurance.address (
    address_id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES insurance.personal_info(person_id),
    street TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coverage Information
CREATE TABLE insurance.coverage (
    coverage_id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES insurance.personal_info(person_id),
    plan_type VARCHAR(50) NOT NULL,
    coverage_amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_frequency VARCHAR(20) NOT NULL,
    additional_benefits TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Family Members
CREATE TABLE insurance.family_members (
    member_id SERIAL PRIMARY KEY,
    coverage_id INTEGER REFERENCES insurance.coverage(coverage_id),
    name VARCHAR(200) NOT NULL,
    relation VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Health Information
CREATE TABLE insurance.health_info (
    health_id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES insurance.personal_info(person_id),
    height DECIMAL(5,2) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    has_existing_conditions BOOLEAN DEFAULT FALSE,
    existing_conditions TEXT,
    smoking_status VARCHAR(50),
    family_history TEXT,
    exercise_frequency VARCHAR(50),
    alcohol_consumption VARCHAR(50),
    taking_medications BOOLEAN DEFAULT FALSE,
    medications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_person_email ON insurance.personal_info(email);
CREATE INDEX idx_coverage_person ON insurance.coverage(person_id);
CREATE INDEX idx_health_person ON insurance.health_info(person_id);