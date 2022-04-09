import * as typeorm from "typeorm";

export function connectionHook(): void {
  let conn: typeorm.Connection;
  beforeAll(async () => {
    conn = await typeorm.createConnection();
  });
  afterAll(async () => {
    await conn.close();
  });
}

export function transactionHook(): typeorm.EntityManager {
  let em: typeorm.EntityManager;
  beforeAll(async () => {
    const conn = typeorm.getConnection();
    const runner = conn.createQueryRunner();
    em = conn.createEntityManager(runner);
    await em.queryRunner.startTransaction();
    jest.spyOn(typeorm, "getManager").mockReturnValue(em);
  });
  afterAll(async () => {
    await em.queryRunner.rollbackTransaction();
    await em.queryRunner.release();
    jest.clearAllMocks();
  });
  return em;
}
