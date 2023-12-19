CREATE OR ALTER PROCEDURE editPost
    @user_id VARCHAR(100),
    @post_id VARCHAR(255),
    @newImageInput VARCHAR(500),
    @newPostContent TEXT
AS
BEGIN
    -- Your logic to update the post based on the provided user_id, post_id, newImageInput, and newPostContent
    UPDATE Posts
    SET imageInput = @newImageInput,
        postContent = @newPostContent
    WHERE user_id = @user_id AND post_id = @post_id;
END;
GO

DROP PROCEDURE IF EXISTS editPost;
