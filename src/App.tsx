import { AxiosResponse } from 'axios';
import { UploadImage } from 'components/UploadImage';
import { WelcomeMessageDTO } from 'dtos/WelcomeMessageDTO';
import React, { useEffect, useState } from 'react';
import { NodeAPI } from 'services/Service';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');

  async function getWelcomeMessage() {
    try {
      const welcomeMessage: AxiosResponse<WelcomeMessageDTO> =
        await NodeAPI.get(`${process.env.REACT_APP_API_URL}`);

      console.log(welcomeMessage.data.mensagem);
      setMessage(welcomeMessage.data.mensagem);
    } catch (error) {
      console.log(error);
      setMessage('Erro na chamada da API');
    }
  }

  useEffect(() => {
    console.log('Renderizei meu componente');
    getWelcomeMessage();
  }, []);

  return (
    <>
      <UploadImage />
    </>
  );
}

export default App;
