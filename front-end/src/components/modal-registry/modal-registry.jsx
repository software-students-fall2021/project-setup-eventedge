import React from 'react';
import {useModalContext} from '../../lib/context/modal';
import {Modal} from '../modal';
import {MembersList} from '../members-list';

// for testing purposes. delete later
const TestComp = () => <div>test</div>;

// {id: string; component: () => React.Component}
export const REGISTERED_MODALS = [
  {id: 'test', title: 'Test', component: () => <TestComp />},
  {id: 'membersList', title: 'Members list', component: () => <MembersList />},
];

export const ModalRegistry = () => {
  const {hideModal, visibleModals} = useModalContext();

  const closeModal = (id) => () => hideModal(id);

  return REGISTERED_MODALS.filter(({id}) => visibleModals.includes(id)).map(
    ({id, component, title}) => (
      <Modal onClose={closeModal(id)} key={id} title={title}>
        {component()}
      </Modal>
    )
  );
};
