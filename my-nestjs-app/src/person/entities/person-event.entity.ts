import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PersonDetails } from './person-details.entity';

@Entity()
export class PersonEvent {
  @PrimaryGeneratedColumn()
  event_id: number; // This should match the column in the database

  @Column()
  event_description: string;

  @ManyToOne(() => PersonDetails, (personDetails) => personDetails.personEvents)
  personDetails: PersonDetails;
}
