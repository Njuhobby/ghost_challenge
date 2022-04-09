import { injectable } from "inversify";
import { getManager } from "typeorm";
import path from "path";
import * as fs from "async-file";
import MigrateLog from "../models/migrate_log";

@injectable()
export default class MigrateService {
  async migrate() {
    console.log("------ migration starts------");
    await this.createMigrateLogIfNotExists();
    const folderPath = path.join(__dirname, "../../db/migrations");
    console.log(`running migration files under ${folderPath}`);
    const dir = await fs.readdir(folderPath);
    for (const fi of dir) {
      // Checks if the SQL file has been executed.
      const logExist = await MigrateLog.getRepository().findOne({
        where: { filename: fi },
      });
      if (!logExist) await this.executeMigration(fi, folderPath);
    }
    console.log("------ migration ends ------");
  }

  async createMigrateLogIfNotExists() {
    console.log("create migrate log if not exists");
    const querySql = await fs.readTextFile(
      path.join(__dirname, "../../db/base.sql")
    );
    await getManager().query(querySql);
  }

  async executeMigration(filename: string, folder: string) {
    const querySql = await fs.readTextFile(path.join(folder, filename));
    if (!querySql) {
      return;
    }
    console.log(`run migration file ${filename}`);
    try {
      await getManager().transaction(async (em) => {
        await em.query(querySql);

        await em.query(`
            INSERT INTO public.migrate_log (filename) VALUES ('${filename}')
          `);
      });
    } catch (e) {
      console.error(filename + " init failed", { error: e });
      throw e;
    }
  }
}
