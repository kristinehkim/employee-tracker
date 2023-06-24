INSERT INTO department
    (name)
VALUES 
    ("Legal"),
    ("Marketing"),
    ("Sales");

INSERT INTO role
    (title, salary, department_id)
VALUES 
    ("Senior Lawyer", 250000, 1),
    ("Lawyer", 100000, 1),
    ("Marketing Director", 100000, 2),
    ("Marketing Associate", 100000, 2),
    ("Sales Director", 75000, 3),
    ("Sales Associate", 60000, 3);

-- NULL is the manager --
-- manager_id Kristine Kim 1, Chris Gallego 4, Connie Carranza 6 you are numbering 1-7 below for all the names to get the manager id --
-- role_id is numbering 1-6 above for the role table next to the job titles --
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES 
    ("Kristine", "Kim", 1, NULL),
    ("Dane", "Shrewsbury", 2, 1),
    ("Joe", "Smith", 2, 1),
    ("Chris", "Gallego", 3, NULL),
    ("Jimmy", "Gordillo", 4, 4),
    ("Connie", "Carranza", 5, NULL),
    ("Sara", "Carter", 6, 6);


    