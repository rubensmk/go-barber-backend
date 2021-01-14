import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
    // eslint-disable-next-line camelcase
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}
