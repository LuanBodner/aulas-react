import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CustomSnackbarProps, SnackbarContextType } from 'types/Types';

const SnackbarContext = createContext<Partial<SnackbarContextType>>(undefined);

function CustomSnackbar(props: CustomSnackbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  function handleClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.type} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export function SnackbarProvider(props: any) {
  const [options, setOptions] = useState<CustomSnackbarProps>();

  return (
    <SnackbarContext.Provider value={{ options, setOptions }}>
      {options && <CustomSnackbar {...options} />}
      {props.children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const { options, setOptions: create } = useContext(SnackbarContext);
  return { options, create };
}
