import {request} from './request-service';
import {useService} from './use-service';

export function chatService() {
  return {
    getChats() {
      return request().get('/chats.json');
    },
    getChatMessages(id) {
      return request().get(`/chats/${id}.json`);
    },
    getChatMembers() {
      return request.get('/members.json');
    },
  };
}

export const useChatService = {
  useChats: () => useService(chatService().getChats),
  useChatMessages: (id) => useService(() => chatService().getChatMessages(id)),
  useChatMembers: () => useService(chatService().getChatMembers),
};
