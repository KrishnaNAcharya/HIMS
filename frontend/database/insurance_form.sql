-- Drop existing tables if they exist
DROP TABLE IF EXISTS billing;
DROP TABLE IF EXISTS claim;
DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS disease;
DROP TABLE IF EXISTS hospital;
DROP TABLE IF EXISTS policy;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS personal_info;

-- Create the database
CREATE DATABASE insurance_db;

-- Switch to the database
\c insurance_db;

-- Create tables for each section of the form

-- Personal Information Table
CREATE TABLE personal_info (
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    status VARCHAR(10) NOT NULL
);

-- Address Table
CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    person_id INT REFERENCES personal_info(person_id),
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pin_code VARCHAR(10) NOT NULL
);

-- Policy Table
CREATE TABLE policy (
    policy_id SERIAL PRIMARY KEY,
    person_id INT REFERENCES personal_info(person_id),
    policy_number VARCHAR(50) UNIQUE NOT NULL,
    policy_type VARCHAR(20) NOT NULL,
    sum_insured DECIMAL(10, 2) NOT NULL,
    tenure INT NOT NULL,
    premium DECIMAL(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    policy_benefits TEXT,
    medical_history TEXT
);

-- Hospital Table
CREATE TABLE hospital (
    hospital_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    is_networked BOOLEAN NOT NULL
);

-- Disease Table
CREATE TABLE disease (
    disease_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    infected_from DATE,
    diagnosis_date DATE
);

-- Test Table
CREATE TABLE test (
    test_id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    disease_code VARCHAR(20) REFERENCES disease(code),
    price DECIMAL(10, 2) NOT NULL
);

-- Claim Table
CREATE TABLE claim (
    claim_id SERIAL PRIMARY KEY,
    policy_number VARCHAR(50) REFERENCES policy(policy_number),
    person_id INT REFERENCES personal_info(person_id),
    issued_amount DECIMAL(10, 2) NOT NULL,
    issued_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    claimed_amount DECIMAL(10, 2) NOT NULL
);

-- Billing Table
CREATE TABLE billing (
    bill_id SERIAL PRIMARY KEY,
    disease_code VARCHAR(20) REFERENCES disease(code),
    bill_amount DECIMAL(10, 2) NOT NULL,
    date_of_admission DATE NOT NULL,
    date_of_discharge DATE NOT NULL
);