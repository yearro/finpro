import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryColumn()
  guid: string;

  @Column({ type: "varchar", length: "100" })
  name: string;

  @Column({ type: "varchar", length: "100" })
  lastName: string;

  @Column({ type: "varchar", length: "100" })
  email: string;

  @Column({ type: "varchar", length: "100" })
  password: string;

  @Column({ type: "bigint" })
  phone: number;

  @Column({ type: "boolean", default: true })
  isAdmin: boolean;

  @Column({ type: "varchar", length: "20" })
  state: string;

  @Column({ type: "varchar", length: "300", default: "" })
  job: string;
}
