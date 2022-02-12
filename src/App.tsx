import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const tabs = new Array<string>('Pagina inicial', 'Usuarios', 'Notas');

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
            <Typography variant={'h5'} color={'black'}>
              Sistema de notas
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
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
          sx={{ flexGrow: 1, paddingTop: '1.5%', paddingLeft: '15%' }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<>Texto qualquer</>} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
