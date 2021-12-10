import React from 'react';
import {useToastContext} from '../../lib/context/toast';
import {Toast} from './toast';

export const ToastRegistry = () => {
  const {visibleToasts, hideToast} = useToastContext();

  return visibleToasts.map(({type, message, id}) => (
    <Toast key={id} onClose={() => hideToast(id)} type={type} message={message} />
  ));
};
