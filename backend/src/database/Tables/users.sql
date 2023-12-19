CREATE TABLE Users (
<<<<<<< HEAD
    user_id VARCHAR(100) NOT NULL ,
    userName VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    role VARCHAR(20) Default 'user',
    welcomed BIT Default 0,
    isDeleted BIT DEFAULT 0 
)
=======
    user_id VARCHAR(100) NOT NULL PRIMARY KEY,
    userName VARCHAR(200) NOT NULL UNIQUE, 
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    isDeleted BIT DEFAULT 0 
);
DROP TABLE IF EXISTS Users;
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e



ALTER TABLE Users ADD isDeleted BIT DEFAULT 0 

UPDATE Users SET isDeleted = 0


SELECT * FROM Users WHERE EMAIL ='dankinyi99@gmail.com' 

