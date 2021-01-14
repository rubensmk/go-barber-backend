import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
class sendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUsersTokensRepository,
    ) { } // eslint-disable-line


    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist.');
        }
        const { token } = await this.userTokensRepository.generate(user.id);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Go Barber ] Recuperacao de senha',
            templateData: {
                template: 'Olá, {{name}}: {{token}}',
                variables: {
                    name: user.name,
                    token,
                },
            },
        });
    }
}

export default sendForgotPasswordEmailService;
