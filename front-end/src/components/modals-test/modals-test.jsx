import React from 'react';
import {REGISTERED_MODALS} from '../modal-registry';
import {useModalContext} from '../../lib/context/modal';

// simple testing screen for all modals
export const ModalsTest = () => {
  const {showModal} = useModalContext();

  return (
    <>
      <h2>Modals test screen</h2>
      {REGISTERED_MODALS.map(({id}) => (
        <>
          <button key={id} onClick={() => showModal(id)}>
            {id}
          </button>
          <br />
        </>
      ))}
    </>
  );
};
