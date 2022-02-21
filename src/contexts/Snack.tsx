import { Alert, Snackbar } from '@mui/material';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

type SnackPropType = {
  id?: number;
  message?: string;
  severity?: 'success' | 'error';
  isOpen?: boolean;
  handleClose?: () => void;
};

type ContextPropType = {
  options: SnackPropType;
  setOptions: React.Dispatch<React.SetStateAction<SnackPropType | undefined>>;
};

const Context = createContext<Partial<ContextPropType>>(undefined);

function CustomSnackbar(props: SnackPropType) {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleClose = useCallback(() => {
    setIsOpen(!props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        severity={props.severity}
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export function SnackbarProvider(props: any) {
  const [options, setOptions] = useState<SnackPropType>();

  ReactDOM.render(
    <Context.Provider value={{ options, setOptions }}>
      {options && <CustomSnackbar {...options} />}
      {props.children}
    </Context.Provider>,
    document.getElementById('root')
  );

  return <>{props.children}</>;
}

export function useSnackbar() {
  const { options, setOptions: create } = useContext(Context);
  return { options, create };
}
