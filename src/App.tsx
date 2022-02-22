import React from 'react';
import { ExternalRoutes } from 'routes/ExternalRoutes';
import { InternalRoutes } from 'routes/InternalRoutes';
import { getToken } from 'utils/Utils';

function App() {
  return <>{getToken() ? <InternalRoutes /> : <ExternalRoutes />}</>;
}

export default App;
