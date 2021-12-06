import React, {useEffect} from 'react';
import {useChatService} from '../../lib/services/chat-service';
import styles from './members-list.module.css';

export const MembersList = ({id}) => {
  const {isLoading, data} = useChatService.useChatMembers(id);
  const {
    isLoading: isLoadingLeaveChat,
    data: leftChatData,
    post,
  } = useChatService.useLeaveChat();

  useEffect(() => {
    if (leftChatData?.chatId === id) {
      window.location = '/';
    }
  }, [leftChatData]);

  const mapUsers = data?.map(({id, username}) => <li key={id}>{username}</li>);

  const leaveChat = async () => await post(id);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.membersList}>{mapUsers}</ul>
      )}
      {isLoadingLeaveChat ? (
        <p>Loading...</p>
      ) : (
        <button className={styles.leaveChatButton} onClick={leaveChat}>
          Leave chat
        </button>
      )}
    </>
  );
};
