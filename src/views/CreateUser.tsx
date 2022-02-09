import { TextField } from '@mui/material';
import React from 'react';

export default function CreateUser() {
  return (
    <div
      style={{
        backgroundColor: 'red',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ backgroundColor: 'green', height: '90%', width: '45%' }}>
        <TextField
          label={'Nome do usuário'}
          variant="outlined"
          style={{ backgroundColor: 'white' }}
        />
      </div>
    </div>
  );
}
