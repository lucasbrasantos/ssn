

-- db designer
-- https://dbdesigner.page.link/arJ6pcxfWZmTFEGt9





-- ////  Create Tables //// --
-- CREATE SCHEMA `bagaca` ;
-- use `bagaca`;

ALTER TABLE users
ADD firebase data_type column_constraint;


-- DROP TABLE --
DROP TABLE	`bd_tcc_etim_121_g2`.`forum_interactions`;
DROP TABLE	`bd_tcc_etim_121_g2`.`forum`;
DROP TABLE	`bd_tcc_etim_121_g2`.`comment`;
DROP TABLE	`bd_tcc_etim_121_g2`.`user_interests`;
DROP TABLE	`bd_tcc_etim_121_g2`.`friends`;
DROP TABLE	`bd_tcc_etim_121_g2`.`chats`;
DROP TABLE	`bd_tcc_etim_121_g2`.`posts`;
DROP TABLE	`bd_tcc_etim_121_g2`.`interests`;
DROP TABLE	`bd_tcc_etim_121_g2`.`users`;


-- SELECTS --
SELECT * FROM	`bd_tcc_etim_121_g2`.`users`;
SELECT * FROM	`bd_tcc_etim_121_g2`.`posts`;
SELECT * FROM	`bd_tcc_etim_121_g2`.`chats`;
SELECT * FROM	`bd_tcc_etim_121_g2`.`friends`;
SELECT * FROM	`bd_tcc_etim_121_g2`.`interests`;
SELECT * FROM	`bd_tcc_etim_121_g2`.`user_interests`;
SELECT * FROM	`bd_tcc_etim_121_g2`.`comment`;
SELECT * FROM	`bd_tcc_etim_121_g2`.`forum`;
SELECT * FROM	`bd_tcc_etim_121_g2`.`forum_interactions`;

SELECT	`userid`, `username`, `name`, `email`, `photourl`, `points`, `timecreated`, `firebase`, `description` FROM `bd_tcc_etim_121_g2`.`users`;
--
SELECT	`postid`, `title`, `photourl`, `timeposted`, `likes`, `userid`, `tag`, `moderator_status` FROM `bd_tcc_etim_121_g2`.`posts`;
--
SELECT	`message`, `time_stamp`, `userid_senderid`, `userid_receiverid` FROM `bd_tcc_etim_121_g2`.`chats`;
--
SELECT	`userid`, `useridfriend` FROM `bd_tcc_etim_121_g2`.`friends`;
--
SELECT  `interestsid`, `description` FROM `bd_tcc_etim_121_g2`.`interests`;
--
SELECT  `interestsid`, `userid` FROM `bd_tcc_etim_121_g2`.`user_interests`;
--
SELECT  `userid`, `postid`, `timecommented`, `comment`, `moderator_status` FROM `bd_tcc_etim_121_g2`.`comment`;
--
SELECT  `forumid`, `userid`, `title`, `description`, `tag`, `likes`, `created_at`, `moderator_status` FROM `bd_tcc_etim_121_g2`.`forum`;
--
SELECT  `interactionid`, `userid`, `forumid`, `content`, `photourl`, `likes`, `created_at`, `moderator_status` FROM `bd_tcc_etim_121_g2`.`forum_interactions`;


-- DELETE FROM --
DELETE FROM	`bd_tcc_etim_121_g2`.`forum_interactions`;
DELETE FROM	`bd_tcc_etim_121_g2`.`forum`;
DELETE FROM	`bd_tcc_etim_121_g2`.`comment`;
DELETE FROM	`bd_tcc_etim_121_g2`.`user_interests`;
DELETE FROM	`bd_tcc_etim_121_g2`.`friends`;
DELETE FROM	`bd_tcc_etim_121_g2`.`chats`;
DELETE FROM	`bd_tcc_etim_121_g2`.`posts`;
DELETE FROM	`bd_tcc_etim_121_g2`.`interests`;
DELETE FROM	`bd_tcc_etim_121_g2`.`users`;


-- RESET AUTO_INCREMENT --
ALTER TABLE	`bd_tcc_etim_121_g2`.`userid` AUTO_INCREMENT = 1;
ALTER TABLE	`bd_tcc_etim_121_g2`.`postid` AUTO_INCREMENT = 1;
ALTER TABLE	`bd_tcc_etim_121_g2`.`chatid` AUTO_INCREMENT = 1;
ALTER TABLE	`bd_tcc_etim_121_g2`.`commentid` AUTO_INCREMENT = 1;
ALTER TABLE	`bd_tcc_etim_121_g2`.`interests` AUTO_INCREMENT = 1;
ALTER TABLE	`bd_tcc_etim_121_g2`.`forum` AUTO_INCREMENT = 1;
ALTER TABLE	`bd_tcc_etim_121_g2`.`forum_interactions` AUTO_INCREMENT = 1;




-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


-- 
-- users
-- interests
-- user_interests
-- posts
-- comment
-- forum
-- forum_interactions
-- friends
-- chats
-- 


-- == Moderador_status == --

-- 0: "Postado" - enviado e publico para visualização
-- 1: "Denunciado" - Indica que o fórum ou post foi denunciado
-- 2: "Bloqueado" - bloqueado pelo moderador
-- 3: "Ok" - revisado e considerado apropriado pelo moderador.


-- DATETIME format values in 'YYYY-MM-DD hh:mm:ss' an/mes/dia hora:minutos:segundos

-- //////// --



