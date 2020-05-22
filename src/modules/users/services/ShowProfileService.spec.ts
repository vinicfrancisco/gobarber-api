import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowProfile from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfile;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    showProfile = new ShowProfile(fakeUserRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@gmail.com');
  });

  it('should not be able to show a profile from non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'invalid id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
