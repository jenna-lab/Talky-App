CREATE OR ALTER PROCEDURE editComment
    @comment_id INT,
    @user_id VARCHAR(100),
    @post_id VARCHAR(255),
    @commentContent VARCHAR(MAX),
    @commentTime DATETIME
AS
BEGIN
    UPDATE Comments
    SET
        user_id = @user_id,
        post_id = @post_id,
        commentContent = @commentContent,
        commentTime = @commentTime
    WHERE
        comment_id = @comment_id;
END;