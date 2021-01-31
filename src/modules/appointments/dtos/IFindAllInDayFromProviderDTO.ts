import { defaultMaxListeners } from 'nodemailer/lib/mailer';

export default interface IFindAllInDayFromProviderDTO {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}
