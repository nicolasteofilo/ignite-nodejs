import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepossiotryInMemory';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPassWordMailUseCase } from './SendForgotPassWordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPassWordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPassWordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'Lois Manning',
      email: 'pa@uruvod.dk',
      password: '1071717964',
      avatar: 'https://robohash.org/doloresquisquam.bmp?size=50x50&set=set1',
      driver_license: '3348755774',
    });

    await sendForgotPasswordMailUseCase.execute('pa@uruvod.dk');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send email if user not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('ka@uj.gr')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    usersRepositoryInMemory.create({
      driver_license: '787330',
      email: 'abome@regrog.ee',
      name: 'Leon Perkins',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('abome@regrog.ee');

    expect(generateTokenMail).toBeCalled();
  });
});
