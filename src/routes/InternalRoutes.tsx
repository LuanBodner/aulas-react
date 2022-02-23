import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { removeToken } from 'utils/Utils';
import { ListUsers } from 'views/InternalViews/ListUsers';
import { UpdateUser } from 'views/InternalViews/UpdateUser';

export function InternalRoutes() {
  const tabs = new Array<string>('Pagina inicial', 'Usuarios', 'Notas');
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  function handleIconButtonClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    removeToken();
    window.location.href = '/';
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          sx={{
            zIndex: 100,
            backgroundColor: 'beige',
          }}
        >
          <Toolbar>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100vw',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant={'h5'} color={'black'}>
                  Sistema de notas
                </Typography>
              </div>

              <div>
                <IconButton onClick={handleIconButtonClick}>
                  <AccountCircle style={{ width: '40px', height: '40px' }} />
                </IconButton>
              </div>
            </div>
            <Menu
              anchorEl={anchorEl}
              open={anchorEl ? true : false}
              onClose={() => {
                handleMenuClose();
              }}
            >
              <MenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                Sair
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            width: 240,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              zIndex: 1,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {tabs.map((tab) => {
                return (
                  <ListItem
                    component={Link}
                    to={
                      tab === 'Pagina inicial'
                        ? '/'
                        : tab === 'Usuarios'
                        ? '/users'
                        : '/notas'
                    }
                    button
                  >
                    <ListItemText primary={tab} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: '1.5%',
            paddingLeft: '3%',
            paddingRight: '2%',
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<>Pagina inicial</>} />
            <Route path="/notas" element={<>Notas</>} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/user/:id" element={<UpdateUser />} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
