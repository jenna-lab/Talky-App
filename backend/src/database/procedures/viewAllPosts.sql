CREATE OR ALTER PROCEDURE viewAllPosts
AS
BEGIN
    SELECT * FROM Posts;
END;


DROP PROCEDURE IF EXISTS viewAllPosts;