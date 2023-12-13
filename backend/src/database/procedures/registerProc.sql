CREATE OR ALTER PROCEDURE registerUsers(
    @user_id VARCHAR(100),
    @userName VARCHAR(200),
    @email VARCHAR(300),
    @profile_url VARCHAR(300),
    @password VARCHAR(200)
)
AS
BEGIN

    INSERT INTO Users(user_id, userName, email, profile_url,password)
    VALUES(@user_id, @userName, @email,profile_url,@password)

END