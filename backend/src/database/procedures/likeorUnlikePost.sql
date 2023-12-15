CREATE OR ALTER PROCEDURE unlikePost
    @user_id VARCHAR(100),
    @post_id VARCHAR(255)
AS
BEGIN
    DELETE FROM PostLikes
    WHERE user_id = @user_id AND post_id = @post_id;
END;


DROP PROCEDURE IF EXISTS unlikePost;


CREATE OR ALTER PROCEDURE likePost
    @user_id VARCHAR(100),
    @post_id VARCHAR(255)
AS
BEGIN
    INSERT INTO PostLikes (user_id, post_id)
    VALUES (@user_id, @post_id);
END;


DROP PROCEDURE IF EXISTS likePost;


CREATE OR ALTER PROCEDURE checkLikedPost
    @user_id VARCHAR(100),
    @post_id VARCHAR(255)
AS
BEGIN

    SELECT TOP 1 1 AS isLiked
    FROM PostLikes
    WHERE user_id = @user_id AND post_id = @post_id;
END;


DROP PROCEDURE IF EXISTS checkLikedPost;
