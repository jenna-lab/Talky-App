CREATE TABLE Users (
    user_id VARCHAR(100) NOT NULL ,
    userName VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    role VARCHAR(20) Default 'user',
    welcomed BIT Default 0,
    isDeleted BIT DEFAULT 0 
)



ALTER TABLE Users ADD isDeleted BIT DEFAULT 0 

UPDATE Users SET isDeleted = 0


SELECT * FROM Users WHERE EMAIL ='dankinyi99@gmail.com' 

