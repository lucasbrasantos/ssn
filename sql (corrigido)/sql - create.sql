


CREATE TABLE `users` (
	`userid` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(64) NOT NULL,
	`name` varchar(64) NOT NULL,
	`email` varchar(64) NOT NULL,
	`photourl` varchar(512) NOT NULL,
	`points` INT NOT NULL,
	`timecreated` DATETIME NOT NULL,
	`firebase` varchar(128),
	`description` varchar(128),
	PRIMARY KEY (`userid`)
);

CREATE TABLE `posts` (
	`postid` INT NOT NULL AUTO_INCREMENT,
	`title` varchar(64) NOT NULL,
	`photourl` varchar(512) NOT NULL,
	`timeposted` DATETIME NOT NULL,
	`likes` INT NOT NULL,
	`userid` INT NOT NULL,
	`tag` INT NOT NULL,
	`moderator_status` TINYINT NOT NULL,
	PRIMARY KEY (`postid`)
);

CREATE TABLE `chats` (
	`chatid` INT NOT NULL AUTO_INCREMENT,
	`message` varchar(512) NOT NULL,
	`time_stamp` DATETIME NOT NULL,
	`userid_senderid` INT NOT NULL,
	`userid_receiverid` INT NOT NULL,
	PRIMARY KEY (`chatid`)
);

CREATE TABLE `friends` (
	`userid` INT NOT NULL,
	`useridfriend` INT NOT NULL,
	PRIMARY KEY (`userid`,`useridfriend`)
);

CREATE TABLE `interests` (
	`interestsid` INT NOT NULL AUTO_INCREMENT,
	`description` varchar(64) NOT NULL,
	PRIMARY KEY (`interestsid`)
);

CREATE TABLE `user_interests` (
	`interestsid` INT NOT NULL,
	`userid` INT NOT NULL,
	PRIMARY KEY (`interestsid`,`userid`)
);

CREATE TABLE `comment` (
	`commentid` INT NOT NULL AUTO_INCREMENT,
	`userid` INT NOT NULL,
	`postid` INT NOT NULL,
	`timecommented` DATETIME NOT NULL,
	`comment` varchar(512) NOT NULL,
	`moderator_status` TINYINT NOT NULL,
	PRIMARY KEY (`commentid`)
);

CREATE TABLE `forum` (
	`forumid` INT NOT NULL AUTO_INCREMENT,
	`userid` INT NOT NULL,
	`title` varchar(64) NOT NULL,
	`description` varchar(64) NOT NULL,
	`tag` INT NOT NULL,
	`likes` INT NOT NULL,
	`created_at` DATETIME NOT NULL,
	`moderator_status` TINYINT NOT NULL,
	PRIMARY KEY (`forumid`)
);

CREATE TABLE `forum_interactions` (
	`interactionid` INT NOT NULL AUTO_INCREMENT,
	`userid` INT NOT NULL,
	`forumid` INT NOT NULL,
	`content` varchar(512) NOT NULL,
	`photourl` varchar(512),
	`likes` INT NOT NULL,
	`created_at` DATETIME NOT NULL,
	`moderator_status` TINYINT NOT NULL,
	PRIMARY KEY (`interactionid`)
);

ALTER TABLE `posts` ADD CONSTRAINT `posts_fk0` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`);

ALTER TABLE `posts` ADD CONSTRAINT `posts_fk1` FOREIGN KEY (`tag`) REFERENCES `interests`(`interestsid`);

ALTER TABLE `chats` ADD CONSTRAINT `chats_fk0` FOREIGN KEY (`userid_senderid`) REFERENCES `users`(`userid`);

ALTER TABLE `chats` ADD CONSTRAINT `chats_fk1` FOREIGN KEY (`userid_receiverid`) REFERENCES `users`(`userid`);

ALTER TABLE `friends` ADD CONSTRAINT `friends_fk0` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`);

ALTER TABLE `friends` ADD CONSTRAINT `friends_fk1` FOREIGN KEY (`useridfriend`) REFERENCES `users`(`userid`);

ALTER TABLE `user_interests` ADD CONSTRAINT `user_interests_fk0` FOREIGN KEY (`interestsid`) REFERENCES `interests`(`interestsid`);

ALTER TABLE `user_interests` ADD CONSTRAINT `user_interests_fk1` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`);

ALTER TABLE `comment` ADD CONSTRAINT `comment_fk0` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`);

ALTER TABLE `comment` ADD CONSTRAINT `comment_fk1` FOREIGN KEY (`postid`) REFERENCES `posts`(`postid`);

ALTER TABLE `forum` ADD CONSTRAINT `forum_fk0` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`);

ALTER TABLE `forum` ADD CONSTRAINT `forum_fk1` FOREIGN KEY (`tag`) REFERENCES `interests`(`interestsid`);

ALTER TABLE `forum_interactions` ADD CONSTRAINT `forum_interactions_fk0` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`);

ALTER TABLE `forum_interactions` ADD CONSTRAINT `forum_interactions_fk1` FOREIGN KEY (`forumid`) REFERENCES `forum`(`forumid`);



