import { Controller, Get, Param } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('event/:eventId/age')
  getAgeByEvent(@Param('eventId') eventId: number) {
    return this.personService.findPersonAgeByEvent(eventId);
  }
}
