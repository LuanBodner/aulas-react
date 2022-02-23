import React from 'react';

export type CustomSnackbarProps = {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  isOpen?: boolean;
};

export type SnackbarContextType = {
  options: CustomSnackbarProps;
  setOptions: React.Dispatch<
    React.SetStateAction<CustomSnackbarProps | undefined>
  >;
};
