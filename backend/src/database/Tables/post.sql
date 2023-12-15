CREATE TABLE Posts (
  post_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  imageInput VARCHAR(255),
  postContent VARCHAR(500) NOT NULL,
  timeposted VARCHAR(50) NOT NULL,
  is_deleted BIT DEFAULT 0,
  
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


DROP TABLE IF EXISTS Posts;