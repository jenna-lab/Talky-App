CREATE OR ALTER PROCEDURE deletePost
    @user_id VARCHAR(100),
    @post_id VARCHAR(255)
AS
BEGIN
    -- Your logic to delete the post based on the provided user_id and post_id
    DELETE FROM Posts
    WHERE user_id = @user_id AND post_id = @post_id;
END;
GO

DROP PROCEDURE IF EXISTS deletePost;