import React from 'react';
import {useModalContext} from '../../lib/context/modal';
import {Modal} from './modal';
import {SendMessage} from '../send-message';
import {MembersList} from '../members-list';
import {CreateGroupChat} from '../create-group-chat';
import {PendingEvents} from '../pending-events';
import {CreateEvent} from '../create-event';

const generator = (Component) => (props) => <Component {...props} />;

// {[id: string]: component: React.Component; title: string}
export const REGISTERED_MODALS = {
  membersList: {title: 'Members list', component: MembersList},
  sendMessage: {title: 'Send message', component: SendMessage},
  createGroupChat: {title: 'Create group chat', component: CreateGroupChat},
  pendingEvents: {title: 'Pending events', component: PendingEvents},
  createEvent: {title: 'Create event', component: CreateEvent},
};

export const ModalRegistry = () => {
  const {hideModal, visibleModals} = useModalContext();

  const closeModal = (id) => () => hideModal(id);

  return (
    <>
      {visibleModals.map(({id, props}) => {
        const modal = REGISTERED_MODALS[id];

        return (
          <Modal onClose={closeModal(id)} key={id} title={modal.title}>
            {generator(modal.component)({
              ...props,
              dismissModal: closeModal(id),
            })}
          </Modal>
        );
      })}
    </>
  );
};
