-- CREATE DATABASE 
create database post_comment_db;

-- CREATE TABLE USERS
CREATE TABLE "users" (
  "id" serial NOT NULL,
  "name" varchar(100),
  "email" varchar(191),
  "password" text NOT NULL,
  PRIMARY KEY ("id")
);

-- CREATE TABLE POSTS
CREATE TABLE "posts" (
  "id" serial NOT NULL,
  "user_id" int4,
  "title" varchar(100),
  "description" text,
  "file_name" varchar(255),
  "file_path" varchar(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_user_post" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

-- CREATE TABLE COMMENTS
CREATE TABLE "comments" (
  "id" serial NOT NULL,
  "user_id" int4,
  "post_id" int4,
  "description" text,
  PRIMARY KEY ("id"),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_user_comment" FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
  CONSTRAINT "fk_post_comment" FOREIGN KEY ("post_id") REFERENCES "posts" ("id")
);