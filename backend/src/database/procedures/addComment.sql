
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