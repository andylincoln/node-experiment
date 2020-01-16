import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  completed: boolean
}
