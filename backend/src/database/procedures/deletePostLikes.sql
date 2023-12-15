CREATE OR ALTER PROCEDURE deletePostLikes
    @post_id VARCHAR(255)
AS
BEGIN
    DELETE FROM PostLikes WHERE post_id = @post_id;
END;
GO

DROP PROCEDURE IF EXISTS deletePostLikes;