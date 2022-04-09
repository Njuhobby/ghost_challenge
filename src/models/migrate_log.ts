import { Entity, Column, BaseEntity } from "typeorm";

@Entity("migrate_log")
export default class MigrateLog extends BaseEntity {
  @Column("varchar", {
    nullable: false,
    primary: true,
    name: "filename",
  })
  filename: string;

  @Column("timestamp with time zone", {
    nullable: false,
    name: "execute_time",
  })
  executeTime: Date;
}
