import {request} from './request-service';
import {useGetService, usePostService} from './use-service';

export function chatService() {
  return {
    getChats() {
      return request().get('/chats');
    },
    getChatMembers(id) {
      return request().get(`/chats/${id}/members`);
    },
    createChat({chatName, usersList}) {
      return request().withBody({chatName, usersList}).post('/chats');
    },
  };
}

export const useChatService = {
  useChats: () => useGetService(chatService().getChats),
  useChatMembers: (id) => useGetService(() => chatService().getChatMembers(id)),
  useCreateChat: () => usePostService(chatService().createChat),
};
