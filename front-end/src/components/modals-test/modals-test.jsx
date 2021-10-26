import React from 'react';
import {REGISTERED_MODALS} from '../modal-registry';
import {useModalContext} from '../../lib/context/modal';

// simple testing screen for all modals
export const ModalsTest = () => {
  const {showModal} = useModalContext();

  return (
    <>
      <h2>Modals test screen</h2>
      {Object.keys(REGISTERED_MODALS).map((key) => (
        <>
          <button key={key} onClick={() => showModal(key, {id: 10})}>
            {key}
          </button>
          <br />
        </>
      ))}
    </>
  );
};
