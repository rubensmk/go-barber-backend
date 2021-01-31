/* eslint-disable camelcase */
import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
    date: Date;
    provider_id: string;
    user_id: string;

}
@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository, // eslint-disable-next-line prettier/prettier
    ) { }

    public async execute({
        date,
        provider_id,
        user_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        console.log(appointmentDate);
        if (isBefore(appointmentDate, Date.now())) {
            console.log(Date.now())
            throw new AppError(
                "You can't create an appointment on a past date.",
            );
        }

        if (user_id === provider_id) {
            throw new AppError(
                "You can't create an appointment with yourself.",
            );
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                'You can only create appontments between 8am and 5pm.',
            );
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked!');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
