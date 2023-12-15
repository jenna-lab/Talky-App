CREATE TABLE PostLikes (
    like_id INT PRIMARY KEY IDENTITY(1,1),
    user_id VARCHAR(100),
    post_id VARCHAR(255),
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_PostLikes_Users FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT FK_PostLikes_Posts FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);
