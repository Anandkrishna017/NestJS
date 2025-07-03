import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PersonEvent } from './person-event.entity';

@Entity()
export class PersonDetails {
  @PrimaryGeneratedColumn()
  person_id: number;

  @Column()
  birthdate: Date;

  @OneToMany(() => PersonEvent, (personEvent) => personEvent.personDetails)
  personEvents: PersonEvent[];
}
