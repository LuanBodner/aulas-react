import React, { useState } from 'react';
import { ExternalRoutes } from 'routes/ExternalRoutes';
import { InternalRoutes } from 'routes/InternalRoutes';
import { getToken } from 'utils/Utils';

function App() {
  const [token, setToken] = useState<string>(getToken());

  return <>{token ? <InternalRoutes /> : <ExternalRoutes />}</>;
}

export default App;
