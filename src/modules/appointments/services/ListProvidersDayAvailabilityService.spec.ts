import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProvidersDayAvailabilityService from './ListProvidersDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayProvidersDayAvailability: ListProvidersDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listDayProvidersDayAvailability = new ListProvidersDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user51',
      date: new Date(2020, 4, 14, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user51',
      date: new Date(2020, 4, 14, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 14, 11).getTime();
    });

    const availability = await listDayProvidersDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 14,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 14,
          available: false,
        },
        {
          hour: 15,
          available: false,
        },
        {
          hour: 16,
          available: true,
        },
        {
          hour: 17,
          available: true,
        },
      ]),
    );
  });
});
