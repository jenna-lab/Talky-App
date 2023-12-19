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

<<<<<<< HEAD
END
=======
END


>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
