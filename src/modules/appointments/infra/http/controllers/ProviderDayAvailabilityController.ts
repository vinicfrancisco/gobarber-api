import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersDayAvailabilityService from '@modules/appointments/services/ListProvidersDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listProviderDayAvailabilty = container.resolve(
      ListProvidersDayAvailabilityService,
    );

    const availability = await listProviderDayAvailabilty.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(availability);
  }
}
