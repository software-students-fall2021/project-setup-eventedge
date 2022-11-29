import {request} from './request-service';
import {useGetService, usePostService} from './use-service';
import {getAuthHeader} from './auth-service';

const ACCEPT = 'accept';
const DECLINE = 'decline';

export function eventService() {
  return {
    getMyEvents() {
      return request().withHeader(getAuthHeader()).get('/events');
    },
    getMyPendingEvents() {
      return request().withHeader(getAuthHeader()).get('/events/pending');
    },
    acceptEvent({eventId, accept}) {
      return request()
        .withBody({eventId})
        .withHeader(getAuthHeader())
        .post(`/events/pending/${accept ? ACCEPT : DECLINE}`);
    },
    createEvent({name, date, time, location, description, chatId}) {
      return request()
        .withBody({name, date, time, location, description, chatId})
        .withHeader(getAuthHeader())
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
