import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AxiosResponse } from 'axios';
import { UserDTO } from 'dtos/UserDTO';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NodeAPI } from 'services/Service';

export function ListUsers() {
  const navigate = useNavigate();
  const [listOfUsers, setListOfUsers] = useState<Array<UserDTO>>();
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  useEffect(() => {
    getListOfUsers();
  }, []);
  async function getListOfUsers() {
    setIsloading(true);
    try {
      const list: AxiosResponse<Array<UserDTO>> = await NodeAPI.get(
        `${process.env.REACT_APP_API_URL}/usuario`
      );
      setListOfUsers([...list.data]);

      setSeverity('success');
      setFeedbackMessage('Lista de usuários foi carregada com sucesso');
      setIsOpen(true);
      console.log([...list.data]);
    } catch (error) {
      console.log(error);
      setSeverity('error');
      setFeedbackMessage('Não foi possível buscar os dados dos usuários');
      setIsOpen(true);
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
        <DataGrid
          columns={[
            { field: 'nome', headerName: 'Nome do usuário', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 1 },
          ]}
          rows={listOfUsers}
          pageSize={10}
          autoHeight
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          onRowClick={(event) => {
            navigate(`/user/${event.row.id}`);
          }}
        />
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
