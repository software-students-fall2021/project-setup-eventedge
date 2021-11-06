import {request} from './request-service';
import {useGetService} from './use-service';

export function eventService() {
  return {
    getMyEvents() {
      return request().get('/events');
    },
  };
}

export const useEventService = {
  useMyEvents: () => useGetService(eventService().getMyEvents),
};
