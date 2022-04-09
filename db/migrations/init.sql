CREATE TABLE IF NOT EXISTS "user" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "avatar_path" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "comment" (
  "id" SERIAL PRIMARY KEY,
  "parent_id" INTEGER,
  "content" TEXT NOT NULL,
  "author_id" INTEGER,
  "create_time" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS "upvote" (
  "id" SERIAL PRIMARY KEY,
  "comment_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL
);

-- create some users
INSERT INTO "user" (name, avatar_path)
VALUES('Robe Hope', 'avatar_01.jpg'),
('Sophie Brecht', 'avatar_02.jpg'),
('Cameron Lawrence', 'avatar_03.jpg'),
('Elon Musk', 'avatar_04.jpg'),
('Bill Gates', 'avatar_05.jpg'),
('Yihao Jiang', 'avatar_06.jpg'),
('Jeff Bezos', 'avatar_07.jpg'),
('Will Smith', 'avatar_08.jpg'),
('Chris Rock', 'avatar_09.jpg'),
('Ellen DeGeneres', 'avatar_10.jpg');

-- create some comments
INSERT INTO "comment" (parent_id, content, author_id, create_time)
VALUES(null, 'Jeepers now that''s huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.', 0, '2022-01-01 16:00:00+08'),
(null, 'Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious.:)', 1, '2022-01-02 16:00:00+08'),
(null, 'Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I''ll be recommending then...', 2, '2022-03-01 16:00:00+08');