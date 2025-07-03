import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonInfo } from './entities/person-info.entity';
import { PersonDetails } from './entities/person-details.entity';
import { PersonEvent } from './entities/person-event.entity';
import { from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonInfo)
    private personInfoRepository: Repository<PersonInfo>,

    @InjectRepository(PersonDetails)
    private personDetailsRepository: Repository<PersonDetails>,

    @InjectRepository(PersonEvent)
    private personEventRepository: Repository<PersonEvent>,
  ) {}

  findPersonAgeByEvent(eventId: number) {
    return from(
      this.personEventRepository.findOne({
        where: { event_id: eventId }, // Ensure 'event_id' matches the database column
        relations: ['personDetails'],  // Ensure 'personDetails' is the correct relation
      })
    ).pipe(
      map((personEvent) => {
        if (!personEvent) {
          throw new Error('Event not found');
        }
  
        if (!personEvent.personDetails) {
          throw new Error('Person details not found for this event');
        }
  
        const birthdate = personEvent.personDetails.birthdate;
        const age = this.calculateAge(birthdate);
        return { age, eventDescription: personEvent.event_description };
      }),
      catchError((err) => {
        return throwError(() => new Error(err.message));
      })
    );
  }
  
  
  

  private calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  }
}
