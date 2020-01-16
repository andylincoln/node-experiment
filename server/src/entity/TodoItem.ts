import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { IsString, IsBoolean, validateOrReject } from 'class-validator'

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsString()
  text: string

  @Column()
  @IsBoolean()
  completed: boolean

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    console.log(this)
    return await validateOrReject(this)
  }
}
