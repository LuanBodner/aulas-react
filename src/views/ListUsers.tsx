import { CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'contexts/Snack';
import { UserDTO } from 'dtos/UserDTO';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NodeAPI } from 'services/Service';

export function ListUsers() {
  const navigate = useNavigate();
  const [listOfUsers, setListOfUsers] = useState<Array<UserDTO>>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const snack = useSnackbar();

  useEffect(() => {
    console.log('Getting list of users');
    getListOfUsers();
  }, [navigate]);

  async function getListOfUsers() {
    setIsloading(true);
    try {
      const list: AxiosResponse<Array<UserDTO>> = await NodeAPI.get(
        `${process.env.REACT_APP_API_URL}/usuario`
      );
      setListOfUsers([...list.data]);
    } catch (error) {
      snack.create({
        ...{
          message: 'Não foi possível buscar os dados dos usuários',
          severity: 'error',
          isOpen: true,
        },
      });
    } finally {
      setIsloading(false);
    }
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
    </>
  );
}
