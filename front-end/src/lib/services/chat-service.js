import {getAuthHeader} from './auth-service';
import {request} from './request-service';
import {useGetService, usePostService} from './use-service';

export function chatService() {
  return {
    getChats() {
      return request().withHeader(getAuthHeader()).get('/chats');
    },
    getChatMembers(id) {
      return request().withHeader(getAuthHeader()).get(`/chats/${id}/members`);
    },
    createChat({chatName, usersList}) {
      return request()
        .withHeader(getAuthHeader())
        .withBody({chatName, usersList})
        .post('/chats');
    },
    leaveChat(id) {
      return request().withHeader(getAuthHeader()).post(`/chats/${id}/leave`);
    },
  };
}

export const useChatService = {
  useChats: () => useGetService(chatService().getChats),
  useChatMembers: (id) => useGetService(() => chatService().getChatMembers(id)),
  useCreateChat: () => usePostService(chatService().createChat),
  useLeaveChat: () => usePostService(chatService().leaveChat),
};
