import {request} from './request-service';
import {useService} from './use-service';

export function eventService() {
  return {
    getMyEvents() {
      return request().get('/events.json');
    },
  };
}

export const useEventService = {
  useMyEvents: () => useService(eventService().getMyEvents),
};
