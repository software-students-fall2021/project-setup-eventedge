import React from 'react';
import {useModalContext} from '../../lib/context/modal';
import {Modal} from '../modal';
import {SendMessage} from '../send-message';
import {MembersList} from '../members-list';
import {CreateGroupChat} from '../create-group-chat';

// for testing purposes. delete later
const TestComp = () => <div>test</div>;

const generator = (Component) => (props) => <Component {...props} />;

// {[id: string]: component: () => React.Component}
export const REGISTERED_MODALS = {
  membersList: {title: 'Members list', component: MembersList},
  test: {title: 'Test', component: TestComp},
  sendMessage: {title: 'Send message', component: SendMessage},
  createGroupChat: {title: 'Create group chat', component: CreateGroupChat},
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
            {generator(modal.component)(props)}
          </Modal>
        );
      })}
    </>
  );
};
