import { User, UserRole } from '../../users/entities/user.entity';
import { Event, EventStatus, SportType } from '../../events/entities/event.entity';
import ormconfig from '../../../ormconfig';

async function seed() {
  try {
    await ormconfig.initialize();
    console.log('🌱 Iniciando seed de datos...');

    const userRepository = ormconfig.getRepository(User);
    const eventRepository = ormconfig.getRepository(Event);

    // Verificar si ya existe el usuario demo
    const existingUser = await userRepository.findOne({
      where: { email: 'demo@example.com' }
    });

    if (!existingUser) {
      // Crear usuario demo
      const demoUser = userRepository.create({
        email: 'demo@example.com',
        password: 'demo123',
        firstName: 'Demo',
        lastName: 'User',
        balance: 1000,
        role: UserRole.USER,
      });

      await userRepository.save(demoUser);
      console.log('✅ Usuario demo creado');
    } else {
      console.log('ℹ️ Usuario demo ya existe');
    }

    // Verificar si ya existen eventos
    const existingEvents = await eventRepository.count();
    
    if (existingEvents === 0) {
      // Crear eventos de ejemplo
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
          startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mañana
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
          startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Pasado mañana
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

      console.log('✅ Eventos de ejemplo creados');
    } else {
      console.log('ℹ️ Los eventos ya existen');
    }

    console.log('🎉 Seed completado exitosamente!');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
  } finally {
    await ormconfig.destroy();
  }
}

seed();
