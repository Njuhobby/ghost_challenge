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
VALUES('Robe Hope', '../assets/avatars/avatar_01.png'),
('Sophie Brecht', '../assets/avatars/avatar_02.png'),
('Cameron Lawrence', '../assets/avatars/avatar_03.png'),
('Elon Musk', '../assets/avatars/avatar_04.png'),
('Bill Gates', '../assets/avatars/avatar_05.png'),
('Yihao Jiang', '../assets/avatars/avatar_06.png'),
('Jeff Bezos', '../assets/avatars/avatar_07.png'),
('Will Smith', '../assets/avatars/avatar_08.png'),
('Chris Rock', '../assets/avatars/avatar_09.png'),
('Ellen DeGeneres', '../assets/avatars/avatar_10.png');

-- create some comments
INSERT INTO "comment" (parent_id, content, author_id, create_time)
VALUES (null, 'Jeepers now that''s huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.', 1, '2022-01-01 16:00:00+08'),
(null, 'Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious.:)', 2, '2022-01-02 16:00:00+08'),
(null, 'Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I''ll be recommending then...', 3, '2022-03-01 16:00:00+08'),
(1, 'This is a child comment for the first comment', 8, '2022-04-09 16:00:00+08');