import "reflect-metadata";
import {
  UserService,
  UpvoteService,
  CommentService,
  MigrateService,
} from "../services";

import { Container } from "inversify";
const container = new Container();

container.bind(UserService).to(UserService).inSingletonScope();
container.bind(CommentService).to(CommentService).inSingletonScope();
container.bind(UpvoteService).to(UpvoteService).inSingletonScope();
container.bind(MigrateService).to(MigrateService).inSingletonScope();

export default container;
