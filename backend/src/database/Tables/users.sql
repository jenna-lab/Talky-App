CREATE TABLE Users (
    user_id VARCHAR(100) NOT NULL PRIMARY KEY,
    userName VARCHAR(200) NOT NULL UNIQUE, 
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    isDeleted BIT DEFAULT 0 
);
DROP TABLE IF EXISTS Users;



ALTER TABLE Users ADD isDeleted BIT DEFAULT 0 

UPDATE Users SET isDeleted = 0


SELECT * FROM Users WHERE EMAIL ='dankinyi99@gmail.com' 

