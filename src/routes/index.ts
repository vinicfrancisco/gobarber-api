import { Router } from 'express';

import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/apointments', appointmentsRouter);

export default routes;
