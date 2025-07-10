import { DataSource } from 'typeorm';
import { User, UserRole } from '../../users/entities/user.entity';
import { Event, EventStatus, SportType } from '../../events/entities/event.entity';

export class InitialDataSeed {
  constructor(private dataSource: DataSource) {}

  async run() {
    const userRepository = this.dataSource.getRepository(User);
    const eventRepository = this.dataSource.getRepository(Event);

    // Create demo user
    const demoUser = userRepository.create({
      email: 'demo@example.com',
      password: 'demo123',
      firstName: 'Demo',
      lastName: 'User',
      balance: 1000,
      role: UserRole.USER,
    });

    await userRepository.save(demoUser);

    // Create sample events
    const events = [
      {
        title: 'Real Madrid vs Barcelona',
        description: 'Clásico español en el Santiago Bernabéu',
        sportType: SportType.FOOTBALL,
        team1: 'Real Madrid',
        team2: 'Barcelona',
        odds1: 2.1,
        odds2: 3.2,
        oddsDraw: 3.5,
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        status: EventStatus.OPEN,
      },
      {
        title: 'Lakers vs Warriors',
        description: 'Partido de NBA en el Staples Center',
        sportType: SportType.BASKETBALL,
        team1: 'Lakers',
        team2: 'Warriors',
        odds1: 1.8,
        odds2: 2.3,
        startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        status: EventStatus.OPEN,
      },
      {
        title: 'Nadal vs Djokovic',
        description: 'Final del Abierto de Australia',
        sportType: SportType.TENNIS,
        team1: 'Nadal',
        team2: 'Djokovic',
        odds1: 2.5,
        odds2: 1.6,
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: EventStatus.OPEN,
      },
      {
        title: 'Yankees vs Red Sox',
        description: 'Clásico de la MLB',
        sportType: SportType.BASEBALL,
        team1: 'Yankees',
        team2: 'Red Sox',
        odds1: 1.9,
        odds2: 2.1,
        startTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        status: EventStatus.OPEN,
      },
    ];

    for (const eventData of events) {
      const event = eventRepository.create(eventData);
      await eventRepository.save(event);
    }

    console.log('Initial data seeded successfully!');
  }
}
