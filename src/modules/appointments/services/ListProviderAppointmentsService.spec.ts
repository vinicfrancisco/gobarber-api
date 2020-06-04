import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvicerAppointments: ListProviderAppointmentsService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvicerAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user12',
      date: new Date(2020, 4, 14, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user123',
      date: new Date(2020, 4, 14, 9, 0, 0),
    });

    const appointments = await listProvicerAppointments.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 14,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
