CREATE OR ALTER PROCEDURE deleteComment
    @comment_id INT
AS
BEGIN
    DELETE FROM Comments
    WHERE comment_id = @comment_id;
END;