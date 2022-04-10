import express from "express";
import { Server } from "socket.io";
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
import * as http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  // Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(express.json());
const port = 5000; // default port to listen
const socketIoPort = 8000;

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

      if (
        controllerName === "userController" &&
        (methodName === "upvote" || methodName === "downvote")
      ) {
        req.body.io = io;
      }
      const result =
        Object.keys(req.body).length > 0
          ? await controller[methodName](req.body)
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

  server.listen(socketIoPort, () =>
    console.log(`Socket.io server Listening on port ${port}`)
  );
})();

export default app;
