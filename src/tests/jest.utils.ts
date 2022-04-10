import { Connection, createConnection } from "typeorm";
import User from "../models/user";
import Comment from "../models/comment";
import Upvote from "../models/upvote";
import MigrateLog from "../models/migrate_log";

export function connectionHook(): void {
  let conn: Connection;
  beforeAll(async () => {
    conn = await createConnection({
      type: "postgres",
      url: process.env.TEST_PG_URL,
      entities: [User, Comment, Upvote, MigrateLog],
      name: "default",
    });
    console.log(conn.name);
  });
  afterAll(async () => {
    await conn.destroy();
  });
}
