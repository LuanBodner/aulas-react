import { Button, TextField } from '@mui/material';
import { UserDTO } from 'dtos/UserDTO';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NodeAPI } from 'services/Service';

export function UpdateUser() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { id } = useParams();
  const navigate = useNavigate();

  async function deleteUserById() {
    try {
      await NodeAPI.delete(`${process.env.REACT_APP_API_URL}/usuario/${id}`);
      navigate('/users');
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUserById() {
    const updatedUser = new UserDTO(name, email, password, Number(id));

    try {
      await NodeAPI.put(
        `${process.env.REACT_APP_API_URL}/usuario/${id}`,
        updatedUser
      );
      navigate('/users');
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserById() {
    try {
      const response = await NodeAPI.get(
        `${process.env.REACT_APP_API_URL}/usuario/${id}`
      );

      setName(response.data.nome);
      setEmail(response.data.email);
      setPassword(response.data.senha);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserById();
  }, []);

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
              onClick={() => {
                updateUserById();
              }}
            >
              {'Atualizar'}
            </Button>

            <Button
              variant={'contained'}
              style={{
                backgroundColor: 'red',
                marginLeft: '20px',
                height: '50px',
                width: '100px',
              }}
              onClick={() => {
                deleteUserById();
              }}
            >
              {'Deletar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
