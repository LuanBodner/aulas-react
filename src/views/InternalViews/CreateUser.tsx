import { Button, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'contexts/SnackbarContext';
import { UserDTO } from 'dtos/UserDTO';
import React, { useState } from 'react';
import { NodeAPI } from 'services/Service';

export default function CreateUser() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const snackbar = useSnackbar();

  async function createUserHandler() {
    const userDTO = new UserDTO(name, email, password);

    try {
      const postResponse: AxiosResponse = await NodeAPI.post(
        `${process.env.REACT_APP_API_URL}/usuaasdasdasdasrio`,
        userDTO
      );

      snackbar.create({
        isOpen: true,
        message: 'Usuário cadastrado com sucesso',
        type: 'success',
      });

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      snackbar.create({
        isOpen: true,
        message: 'Usuário cadastrado não foi cadastrado',
        type: 'error',
      });
    }
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
    </div>
  );
}
