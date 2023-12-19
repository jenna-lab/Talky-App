CREATE OR ALTER PROCEDURE viewSinglePost
    @user_id VARCHAR(100),
    @post_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM Posts WHERE user_id = @user_id AND post_id = @post_id;
END;


DROP PROCEDURE IF EXISTS viewSinglePost;