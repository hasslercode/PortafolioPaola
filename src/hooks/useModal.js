import { useCallback, useEffect, useState } from 'react';

export function useModal() {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
    document.body.classList.add('modal-open');
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.classList.remove('modal-open');
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && open) {
        closeModal();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeModal, open]);

  return { open, openModal, closeModal };
}
