import { Alert, Button, Card, Snackbar, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { LoginDTO } from 'dtos/LoginDTO';
import { TokenDTO } from 'dtos/TokenDTO';
import React, { useState } from 'react';
import { NodeAPI } from 'services/Service';
import { removeToken, setToken } from 'utils/Utils';

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  function closeSnackbar() {
    setIsOpen(false);
  }

  async function handleUserLogin() {
    const data = new LoginDTO(email, password);
    try {
      const response: AxiosResponse<TokenDTO> = await NodeAPI.post(
        `${process.env.REACT_APP_API_URL}/login`,
        data
      );

      setToken(response.data.token);
      window.location.href = '/';
    } catch (error) {
      removeToken();
      setFeedbackMessage('Email ou senha inválidos');
      setSeverity('error');
      setIsOpen(true);
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#0F4C81',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <Card style={{ width: '500px', height: '400px' }}>
          <div style={{ width: '100%' }}>
            <div
              style={{
                marginBottom: '25px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <p style={{ fontSize: '24px' }}>Fazer Login</p>
            </div>

            <div
              style={{
                marginBottom: '25px',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TextField
                value={email}
                label={'Email'}
                variant="outlined"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                style={{ width: '75%', backgroundColor: 'white' }}
              />
            </div>
            <div
              style={{
                marginBottom: '45px',
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
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                style={{ width: '75%', backgroundColor: 'white' }}
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
                  width: '150px',
                }}
                onClick={handleUserLogin}
              >
                {'Entrar'}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
