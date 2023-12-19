CREATE OR ALTER PROCEDURE fetchUserPosts
    @user_id VARCHAR(100)
AS
BEGIN
    SELECT * FROM Posts
    WHERE user_id = @user_id;
END;


DROP PROCEDURE IF EXISTS fetchUserPosts;