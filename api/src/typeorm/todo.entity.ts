import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  @Column({
    nullable: false,
    default: false,
  })
  done: boolean;
}
