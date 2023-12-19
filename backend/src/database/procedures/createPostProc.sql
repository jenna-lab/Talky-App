
CREATE OR ALTER PROCEDURE createPost 
    @user_id VARCHAR(100),
    @post_id VARCHAR(255),
    @imageInput VARCHAR(500),
    @postContent TEXT,
    @timeposted VARCHAR(50)
AS
BEGIN
    INSERT INTO Posts (user_id, post_id, imageInput, postContent, timeposted)
    VALUES (@user_id, @post_id, @imageInput, @postContent, @timeposted);
END;


DROP PROCEDURE IF EXISTS createPost;