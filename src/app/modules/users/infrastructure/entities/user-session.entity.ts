import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

export enum STATUS {
  ACTIVO = "ACTIVO",
  ELIMINADO = "ELIMINADO",
  BANEADO = "BANEADO"
}

@Entity("user_sessions")
export class UserSessionEntity {
  @PrimaryGeneratedColumn()
  sessionId!: number;

  @Column()
  token!: string;

  @Column({ nullable: true })
  device?: string;

  @Column({ nullable: true })
  ip?: string;

  @Column({ type: "timestamp", nullable: true })
  expiresAt!: Date;

  @Column({ type: "enum", enum: STATUS, default: "ACTIVO" })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => UserEntity, user => user.sessions)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;
}
