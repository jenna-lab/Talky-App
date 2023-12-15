
CREATE OR ALTER PROCEDURE toggleSoftDeleteUser
    @user_id VARCHAR(100),
    @isDeleted BIT
AS
BEGIN
    UPDATE Users
    SET isDeleted = @isDeleted
    WHERE user_id = @user_id;
END;

DROP PROCEDURE IF EXISTS toggleSoftDeleteUser;