import {request} from './request-service';
import {useGetService, usePostService} from './use-service';

const ACCEPT = 'accept';
const DECLINE = 'decline';

export function eventService() {
  return {
    getMyEvents() {
      return request().get('/events');
    },
    getMyPendingEvents() {
      return request().get('/events/pending');
    },
    acceptEvent({id, accept}) {
      return request()
        .withBody({id})
        .post(`/events/pending/${accept ? ACCEPT : DECLINE}`);
    },
    createEvent({name, date, time, location, description}) {
      return request()
        .withBody({name, date, time, location, description})
        .post('/events/create');
    },
  };
}

export const useEventService = {
  useMyEvents: () => useGetService(eventService().getMyEvents),
  useMyPendingEvents: () => useGetService(eventService().getMyPendingEvents),
  useAcceptEvent: () => usePostService(eventService().acceptEvent),
  useCreateEvent: () => usePostService(eventService().createEvent),
};
