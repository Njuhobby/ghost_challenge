import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity("user")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    name: "avatar_path",
    nullable: false,
  })
  avatarPath: string;
}
