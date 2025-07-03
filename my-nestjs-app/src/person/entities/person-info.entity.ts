import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('person_info')
export class PersonInfo {
  @PrimaryGeneratedColumn()
  person_id: number;

  @Column()
  name: string;
}
