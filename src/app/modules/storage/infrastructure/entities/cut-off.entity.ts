import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { UserEntity } from '@modules/users/infrastructure/entities/user.entity';

export enum STATUS {
  ACTIVO = 'ACTIVO',
  ELIMINADO = 'ELIMINADO'
}

@Entity('cut_offs')
export class CutOffEntity {
  @PrimaryGeneratedColumn()
  cutOffId!: number;

  @ManyToOne(() => UserEntity, user => user.movements)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalEntries!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalOutputs!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalCash!: number;

  @Column('date', { name: 'cutoff_date' })
  cutoffDate!: Date;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVO })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
