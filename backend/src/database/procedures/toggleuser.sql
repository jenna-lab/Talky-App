CREATE OR ALTER PROCEDURE toggleAccountStatus
    @username VARCHAR(100)
AS
BEGIN
    DECLARE @currentStatus BIT
 
    SELECT @currentStatus = isDeleted
    FROM users
    WHERE username = @username
 
    IF @currentStatus = 0
    BEGIN
        UPDATE users
        SET isDeleted = 1
        WHERE username = @username
    END
    ELSE
    BEGIN
        UPDATE users
        SET isDeleted = 0
        WHERE username = @username
    END
END