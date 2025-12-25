import { useCallback, useState } from 'react';
import { useDisclosure } from './use-disclosure';

export const useUpsertModal = <T = undefined>() => {
  const { isOpen, open, close } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<T | undefined>();

  const handleCloseModal = useCallback(() => {
    setSelectedItem(undefined);
    close();
  }, [close, setSelectedItem]);

  const handleEditClick = useCallback(
    (item: T) => {
      setSelectedItem(item);
      open();
    },
    [setSelectedItem, open],
  );

  return {
    isModalOpen: isOpen,
    handleOpenModal: open,
    handleCloseModal,
    handleEditClick,
    selectedItem,
  };
};
