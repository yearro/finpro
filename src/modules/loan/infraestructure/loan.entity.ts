import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LoanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column({ type: "varchar", length: "100" })
  deptorGuid: string;

  @Column({ type: "varchar", length: "100" })
  avalGuid: string;

  @Column()
  currentRate: number;

  @Column({ type: "varchar", length: "100" })
  state: string;

  @Column({ type: "varchar", length: "20" })
  paymentDate: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  balance: number;
}
