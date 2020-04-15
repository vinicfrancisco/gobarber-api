import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/apointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
