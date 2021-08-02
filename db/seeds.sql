INSERT INTO departments (department_name)
VALUES 
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO name_role (title, salary, department_id)
VALUES
('Engineer', 90000, 1),
('Account Manager', 95000, 2),
('Financial Analyst',75000, 1),
('Corporate Lawyer', 105000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', "Doe", 4, 1),
('Mike', 'Chan', 2, NULL),
('Ashley', 'Rodriguez', 3, 2),
('Kevin', 'Tupik', 4, NULL),
('Malia', 'Brown', 1, 4),
('Sarah', 'Lourd', 3, 2),
('Tom', 'Allen', 3, 2),
('Christina', 'Eckendore', 1, NULL);
