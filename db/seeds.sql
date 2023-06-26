INSERT INTO department
    (name)
VALUES 
    ("Legal"),
    ("Marketing"),
    ("Sales");

-- department_id refers to the id of the department table so legal department id is 1, marketing 2, and sales 3 --
INSERT INTO role
    (title, salary, department_id)
VALUES 
    ("Senior Lawyer", 250000, 1),
    ("Lawyer", 100000, 1),
    ("Marketing Director", 100000, 2),
    ("Marketing Associate", 80000, 2),
    ("Sales Director", 75000, 3),
    ("Sales Associate", 60000, 3);

-- NULL is the manager --
-- role_id is referencing the id of the role table above so senior lawyer id is 1, lawyer is 2. , marketing director 3, marketing associate 4, sales director 5, sales associate 6  --
-- manager_id Kristine Kim 1, Chris Gallego 4, Connie Carranza 6 you are numbering 1-7 below for all the names to get the manager id --
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES 
    ("Kristine", "Kim", 1, NULL),
    ("Dane", "Shrewsbury", 2, 1),
    ("Joe", "Smith", 2, 1),
    ("Chris", "Gallego", 3, NULL),
    ("Jimmy", "Gordillo", 4, 4),
    ("Consuelo", "Carranza", 5, NULL),
    ("Sara", "Carter", 6, 6);


    