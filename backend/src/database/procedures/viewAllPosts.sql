CREATE OR ALTER PROCEDURE viewAllPosts
AS
BEGIN
      SELECT P.post_id,P.imageInput,P.postContent,P.timeposted,P.likes,U.userName,U.user_id
FROM Posts as P
LEFT JOIN Users as U
ON P.user_id = U.user_id;
END;;


DROP PROCEDURE IF EXISTS viewAllPosts;