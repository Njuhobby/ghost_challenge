import express from "express";
import { createConnection } from "typeorm";
import container from "./ioc/inversify.config";
import MigrateService from "./services/migrate_service";
import Comment from "./models/comment";
import MigrateLog from "./models/migrate_log";
import Upvote from "./models/upvote";
import User from "./models/user";
import "dotenv/config";

const app = express();
const port = 8080; // default port to listen

(async () => {
  // register global db connection
  await createConnection({
    type: "postgres",
    url: process.env.PG_URL,
    entities: [Comment, User, Upvote, MigrateLog],
  });

  // run migrations
  const migrateService = container.get<MigrateService>(MigrateService);
  await migrateService.migrate();

  // define a route handler for the default home page
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  // start the Express server
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
  });
})();

export default app;
