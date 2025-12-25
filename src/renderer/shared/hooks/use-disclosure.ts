import { useState } from 'react';

export const useDisclosure = (defaultValue = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    close,
    open,
    toggle,
  };
};
