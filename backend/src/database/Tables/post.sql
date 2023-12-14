CREATE TABLE Post (
  post_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  imageInput VARCHAR(255),
  postContent TEXT NOT NULL,
  datetime VARCHAR(50) NOT NULL,
  is_deleted BIT DEFAULT(0),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);