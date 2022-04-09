import { createConnection } from "typeorm";
import "dotenv/config";
import User from "../models/user";
import Comment from "../models/comment";
import Upvote from "../models/upvote";
import MigrateLog from "../models/migrate_log";

module.exports = async () => {
  console.log(
    "-----------  setup jest, register global db connection  -----------------"
  );
  process.env.TZ = "utc";
  await createConnection({
    type: "postgres",
    url: process.env.TEST_PG_URL,
    entities: [User, Comment, Upvote, MigrateLog],
  });
};
