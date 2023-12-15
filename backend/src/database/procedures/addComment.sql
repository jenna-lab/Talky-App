
CREATE OR ALTER PROCEDURE addComment
    @user_id VARCHAR(100),
    @post_id VARCHAR(255),
    @commentContent VARCHAR(MAX),
    @commentTime DATETIME
AS
BEGIN
    INSERT INTO Comments (user_id, post_id, commentContent, commentTime)
    VALUES (@user_id, @post_id, @commentContent, @commentTime);
END;


DROP PROCEDURE IF EXISTS addComment;


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

CREATE OR ALTER PROCEDURE deleteComment
    @comment_id INT
AS
BEGIN
    DELETE FROM Comments
    WHERE comment_id = @comment_id;
END;
