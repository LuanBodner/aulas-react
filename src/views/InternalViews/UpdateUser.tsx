import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField
} from '@mui/material';
import { UserDTO } from 'dtos/UserDTO';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NodeAPI } from 'services/Service';

export function UpdateUser() {
  const [name, setName] = useState<string>('');
  const [messageNameHasError, setMessageNameHasError] = useState<string>('');
  const [messageEmailHasError, setMessageEmailHasError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    setMessageNameHasError('');
  }, [name]);

  useEffect(() => {
    setMessageEmailHasError('');
  }, [email]);

  function validateUserInputs(): boolean {
    let isValid = true;
    if (name.length < 4 || !name.includes(' ')) {
      setMessageNameHasError('Nome digitado está no formato inválido');
      isValid = false;
    }

    if (email.length < 4 || !email.includes('@')) {
      setMessageEmailHasError('Email digitado está no formato inválido');
      isValid = false;
    }
    return isValid;
  }

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

    const isValidInputs = validateUserInputs();
    if (isValidInputs) {
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
  }

  async function getUserById() {
    setIsloading(true);
    try {
      const response = await NodeAPI.get(
        `${process.env.REACT_APP_API_URL}/usuario/${id}`
      );

      setName(response.data.nome);
      setEmail(response.data.email);
      setPassword(response.data.senha);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  function closeSnackbar() {
    setIsOpen(false);
  }

  return (
    <>
      {isLoading === true ? (
        <div
          style={{
            height: '800px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
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
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': {
                      borderColor:
                        messageNameHasError.length > 0 ? 'red' : 'grey',
                    },
                  }}
                  style={{
                    width: '50%',
                    backgroundColor: 'white',
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: '-15px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <p>
                  {messageNameHasError.length > 0 ? messageNameHasError : ''}
                </p>
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
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': {
                      borderColor:
                        messageEmailHasError.length > 0 ? 'red' : 'grey',
                    },
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: '-15px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <p>
                  {messageEmailHasError.length > 0 ? messageEmailHasError : ''}
                </p>
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
      )}

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
    </>
  );
}
