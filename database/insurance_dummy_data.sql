
-- Insert 25 dummy records into personal_info
INSERT INTO insurance.personal_info 
(first_name, last_name, email, phone, date_of_birth, gender, occupation, income_range)
VALUES 
('John', 'Doe', 'john.doe1@example.com', '123-456-7890', '1980-05-15', 'Male', 'Engineer', '50,000-70,000'),
('Jane', 'Smith', 'jane.smith1@example.com', '321-654-0987', '1990-08-22', 'Female', 'Doctor', '70,000-90,000'),
('Alice', 'Johnson', 'alice.johnson@example.com', '456-789-0123', '1975-03-10', 'Female', 'Teacher', '30,000-50,000'),
('Bob', 'Brown', 'bob.brown@example.com', '789-012-3456', '1985-06-18', 'Male', 'Manager', '90,000-110,000'),
('Emily', 'Davis', 'emily.davis@example.com', '234-567-8901', '1995-11-05', 'Female', 'Designer', '40,000-60,000'),
('Michael', 'Wilson', 'michael.wilson@example.com', '678-901-2345', '1982-02-12', 'Male', 'Consultant', '60,000-80,000'),
('Sophia', 'Moore', 'sophia.moore@example.com', '890-123-4567', '1997-09-25', 'Female', 'Writer', '20,000-30,000'),
('Chris', 'Taylor', 'chris.taylor@example.com', '345-678-9012', '1978-01-30', 'Male', 'Architect', '100,000-120,000'),
('Olivia', 'Anderson', 'olivia.anderson@example.com', '901-234-5678', '1992-04-16', 'Female', 'Developer', '80,000-100,000'),
('Liam', 'Thomas', 'liam.thomas@example.com', '123-890-4567', '1988-12-01', 'Male', 'Analyst', '70,000-90,000');

-- Insert corresponding dummy records into address
INSERT INTO insurance.address (person_id, street, city, state, pin_code)
VALUES 
(1, '123 Main St', 'Metropolis', 'NY', '12345'),
(2, '456 Elm St', 'Gotham', 'CA', '54321'),
(3, '789 Oak St', 'Star City', 'TX', '67890'),
(4, '101 Pine St', 'Central City', 'FL', '98765'),
(5, '202 Maple St', 'Springfield', 'IL', '34567'),
(6, '303 Cedar St', 'Smallville', 'OH', '45678'),
(7, '404 Birch St', 'Riverdale', 'PA', '56789'),
(8, '505 Walnut St', 'Hill Valley', 'GA', '67891'),
(9, '606 Cherry St', 'Sunnydale', 'AZ', '78901'),
(10, '707 Ash St', 'Mystic Falls', 'VA', '89012');

-- Insert coverage information
INSERT INTO insurance.coverage (person_id, plan_type, coverage_amount, payment_method, payment_frequency, additional_benefits)
VALUES 
(1, 'Basic', 50000.00, 'Credit Card', 'Monthly', '{"Dental"}'),
(2, 'Premium', 100000.00, 'Bank Transfer', 'Yearly', '{"Vision","Accident"}'),
(3, 'Gold', 75000.00, 'PayPal', 'Quarterly', '{"Accident"}'),
(4, 'Silver', 60000.00, 'Credit Card', 'Monthly', '{"Dental","Life"}'),
(5, 'Platinum', 200000.00, 'Cash', 'Yearly', '{"Life","Critical Illness"}'),
(6, 'Gold', 75000.00, 'Bank Transfer', 'Monthly', '{"Accident","Critical Illness"}'),
(7, 'Basic', 40000.00, 'Credit Card', 'Quarterly', '{"Vision"}'),
(8, 'Premium', 120000.00, 'PayPal', 'Yearly', '{"Dental","Life"}'),
(9, 'Silver', 50000.00, 'Bank Transfer', 'Monthly', '{"Accident"}'),
(10, 'Gold', 75000.00, 'Credit Card', 'Monthly', '{"Vision","Dental"}');

-- Insert family members
INSERT INTO insurance.family_members (coverage_id, name, relation, age, gender)
VALUES 
(1, 'Anna Doe', 'Spouse', 35, 'Female'),
(2, 'Mike Smith', 'Child', 12, 'Male'),
(3, 'Lily Johnson', 'Child', 10, 'Female'),
(4, 'Sara Brown', 'Spouse', 33, 'Female'),
(5, 'Henry Davis', 'Child', 5, 'Male');

-- Insert health information
INSERT INTO insurance.health_info (person_id, height, weight, has_existing_conditions, existing_conditions, smoking_status, family_history, exercise_frequency, alcohol_consumption, taking_medications, medications)
VALUES 
(1, 175.5, 70.2, FALSE, NULL, 'Non-Smoker', 'Heart Disease', 'Regular', 'Occasional', FALSE, NULL),
(2, 162.3, 55.8, TRUE, 'Asthma', 'Non-Smoker', 'Diabetes', 'Irregular', 'Never', TRUE, 'Inhaler'),
(3, 168.0, 60.5, FALSE, NULL, 'Non-Smoker', 'None', 'Regular', 'Occasional', FALSE, NULL),
(4, 180.2, 80.0, TRUE, 'Hypertension', 'Occasional Smoker', 'Heart Disease', 'Irregular', 'Frequent', TRUE, 'Blood Pressure Pills'),
(5, 150.4, 45.3, FALSE, NULL, 'Non-Smoker', 'None', 'Active', 'Never', FALSE, NULL);
