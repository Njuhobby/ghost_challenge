import express from "express";
import { createConnection } from "typeorm";
import container from "./ioc/inversify.config";
import MigrateService from "./services/migrate_service";
import Comment from "./models/comment";
import MigrateLog from "./models/migrate_log";
import Upvote from "./models/upvote";
import User from "./models/user";
import controllers from "./controllers";
import "dotenv/config";
import _ from "lodash";
import cors from "cors";

const app = express();
const port = 5000; // default port to listen

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

  app.use(cors());

  // define a route handler for the default home page
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  // define a router handler for controller/method
  app.post("/:controller/:method", async (req: express.Request, res, next) => {
    try {
      const controllerName = `${req.params.controller}Controller`;
      const methodName = req.params.method;
      const controller = _.get(controllers, controllerName);
      if (!controller)
        throw new Error(`controller ${controllerName} not found`);

      const result = req.body
        ? await controller[methodName](...req.body.params)
        : await controller[methodName]();
      res.json(result);
    } catch (e) {
      next(e);
    }
  });

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
})();

export default app;
