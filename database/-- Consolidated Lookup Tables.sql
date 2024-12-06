-- Consolidated Lookup Tables

CREATE SCHEMA insurance;

-- Comprehensive Lookup Table for Categorical Data
CREATE TABLE insurance.lookup_categories (
    category_id SERIAL PRIMARY KEY,
    category_type VARCHAR(50) NOT NULL,  -- e.g., 'PLAN_TYPE', 'PAYMENT_METHOD', 'RELATIONSHIP', 'SMOKING_STATUS'
    category_code VARCHAR(50) NOT NULL,  -- Unique code within the type
    display_name VARCHAR(100) NOT NULL,  -- Human-readable name
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    UNIQUE(category_type, category_code)
);

-- Personal Information Table
CREATE TABLE insurance.insured_individuals (
    individual_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,
    gender_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    occupation_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    income_bracket_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Addresses Table
CREATE TABLE insurance.individual_addresses (
    address_id SERIAL PRIMARY KEY,
    individual_id INTEGER REFERENCES insurance.insured_individuals(individual_id),
    address_type_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    street TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Policy Coverage Table
CREATE TABLE insurance.policy_coverages (
    policy_id SERIAL PRIMARY KEY,
    individual_id INTEGER REFERENCES insurance.insured_individuals(individual_id),
    plan_type_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    coverage_amount DECIMAL(12,2) NOT NULL,
    payment_method_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    payment_frequency_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    policy_status_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Policy Dependents
CREATE TABLE insurance.policy_dependents (
    dependent_id SERIAL PRIMARY KEY,
    policy_id INTEGER REFERENCES insurance.policy_coverages(policy_id),
    name VARCHAR(200) NOT NULL,
    relationship_type_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    birth_date DATE NOT NULL,
    gender_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Individual Health Profiles
CREATE TABLE insurance.individual_health_profiles (
    health_profile_id SERIAL PRIMARY KEY,
    individual_id INTEGER REFERENCES insurance.insured_individuals(individual_id),
    height DECIMAL(5,2) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    body_mass_index DECIMAL(5,2),
    smoking_status_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    exercise_frequency_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    alcohol_consumption_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    is_taking_medications BOOLEAN DEFAULT FALSE,
    health_risk_level_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    last_medical_check_up DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chronic Conditions
CREATE TABLE insurance.individual_chronic_conditions (
    condition_id SERIAL PRIMARY KEY,
    health_profile_id INTEGER REFERENCES insurance.individual_health_profiles(health_profile_id),
    condition_type_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    diagnosis_date DATE,
    severity_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    is_controlled BOOLEAN DEFAULT FALSE
);

-- Medications
CREATE TABLE insurance.individual_medications (
    medication_record_id SERIAL PRIMARY KEY,
    health_profile_id INTEGER REFERENCES insurance.individual_health_profiles(health_profile_id),
    medication_type_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    prescription_date DATE,
    prescribed_by VARCHAR(200),
    is_ongoing BOOLEAN DEFAULT TRUE
);

-- Family Medical History
CREATE TABLE insurance.individual_family_medical_history (
    family_medical_history_id SERIAL PRIMARY KEY,
    health_profile_id INTEGER REFERENCES insurance.individual_health_profiles(health_profile_id),
    condition_type_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    relationship_type_id INTEGER REFERENCES insurance.lookup_categories(category_id),
    diagnosed_age INTEGER,
    is_hereditary BOOLEAN DEFAULT FALSE
);

-- Indexes for Performance
CREATE INDEX idx_individual_email ON insurance.insured_individuals(email);
CREATE INDEX idx_policy_individual ON insurance.policy_coverages(individual_id);
CREATE INDEX idx_health_profile_individual ON insurance.individual_health_profiles(individual_id);

-- Sample Data Population for Lookup Categories
-- This would be expanded with actual data during implementation
INSERT INTO insurance.lookup_categories 
(category_type, category_code, display_name, description) VALUES
-- Gender
('GENDER', 'MALE', 'Male', 'Male gender'),
('GENDER', 'FEMALE', 'Female', 'Female gender'),
('GENDER', 'OTHER', 'Other', 'Other gender identity'),

-- Occupation Types
('OCCUPATION', 'ENGINEER', 'Engineer', 'Engineering professional'),
('OCCUPATION', 'TEACHER', 'Teacher', 'Education professional'),
('OCCUPATION', 'DOCTOR', 'Doctor', 'Medical professional'),

-- Plan Types
('PLAN_TYPE', 'BASIC', 'Basic Plan', 'Basic insurance coverage'),
('PLAN_TYPE', 'PREMIUM', 'Premium Plan', 'Comprehensive insurance coverage'),

-- Payment Methods
('PAYMENT_METHOD', 'CREDIT_CARD', 'Credit Card', 'Payment via credit card'),
('PAYMENT_METHOD', 'BANK_TRANSFER', 'Bank Transfer', 'Payment via bank transfer'),

-- Relationship Types
('RELATIONSHIP', 'SPOUSE', 'Spouse', 'Marital partner'),
('RELATIONSHIP', 'CHILD', 'Child', 'Biological or adopted child'),
('RELATIONSHIP', 'PARENT', 'Parent', 'Biological parent');