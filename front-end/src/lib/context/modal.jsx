import React, {createContext, useState, useContext} from 'react';

const ModalContext = createContext();

export const ModalContextProvider = ({children}) => {
  const [visibleModals, setVisibleModals] = useState([]);

  const hideModal = (modalId) =>
    setVisibleModals((prevVisibleModals) =>
      prevVisibleModals.filter((visibleModalId) => visibleModalId !== modalId)
    );

  const showModal = (modalId) =>
    setVisibleModals((prevVisibleModals) => [...prevVisibleModals, modalId]);

  return (
    <ModalContext.Provider value={{visibleModals, hideModal, showModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const {visibleModals, hideModal, showModal} = useContext(ModalContext);

  return {
    visibleModals,
    hideModal,
    showModal,
  };
};
