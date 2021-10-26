import React, {createContext, useState, useContext} from 'react';

const ModalContext = createContext();

export const ModalContextProvider = ({children}) => {
  const [visibleModals, setVisibleModals] = useState([]);

  const hideModal = (modalId) =>
    setVisibleModals((prevVisibleModals) =>
      prevVisibleModals.filter((visibleModal) => visibleModal.id !== modalId)
    );

  const showModal = (modalId, props = {}) =>
    setVisibleModals((prevVisibleModals) => [
      ...prevVisibleModals,
      {id: modalId, props},
    ]);

  return (
    <ModalContext.Provider value={{visibleModals, hideModal, showModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
