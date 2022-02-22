import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { UserDTO } from 'dtos/UserDTO';
import React, { useState } from 'react';
import { NodeAPI } from 'services/Service';

export default function CreateUser() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  async function createUserHandler() {
    const userDTO = new UserDTO(name, email, password);

    try {
      const postResponse: AxiosResponse = await NodeAPI.post(
        `${process.env.REACT_APP_API_URL}/usuaasdasdasdasrio`,
        userDTO
      );
      setFeedbackMessage('Usuário cadastrado com sucesso');
      setSeverity('success');
      setIsOpen(true);

      setName('');
      setEmail('');
      setPassword('');
      console.log(postResponse);
    } catch (error) {
      setFeedbackMessage('Usuário cadastrado não foi cadastrado');
      setSeverity('error');
      setIsOpen(true);
      console.log(error);
    }
  }

  function closeSnackbar() {
    setIsOpen(false);
  }

  return (
    <div
      style={{
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: '90%',
          width: '45%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <div
            style={{
              marginBottom: '15px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              label={'Nome do usuário'}
              variant="outlined"
              style={{ width: '50%', backgroundColor: 'white' }}
            />
          </div>

          <div
            style={{
              marginBottom: '15px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField
              value={email}
              label={'Email'}
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
              style={{ width: '50%', backgroundColor: 'white' }}
            />
          </div>

          <div
            style={{
              marginBottom: '15px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField
              value={password}
              label={'Senha'}
              variant="outlined"
              type={'password'}
              onChange={(event) => setPassword(event.target.value)}
              style={{ width: '50%', backgroundColor: 'white' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant={'contained'}
              style={{
                height: '50px',
                width: '100px',
              }}
              onClick={createUserHandler}
            >
              {'Criar'}
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
