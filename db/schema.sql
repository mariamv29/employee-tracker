DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS nameRole;
-- DROP TABLE IF EXISTS employee;



CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);


-- CREATE TABLE nameRole (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   title VARCHAR(30) NOT NULL,
--   salary DECIMALN (10,2) NOT NULL,
--   department_id VARCHAR(30) NOT NULL
-- );

-- CREATE TABLE employee (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   industry_connected BOOLEAN NOT NULL
-- );