CREATE PROCEDURE getOneUser (@user_id VARCHAR(200))
AS
BEGIN
    SELECT * FROM Users WHERE user_id = @user_id
END