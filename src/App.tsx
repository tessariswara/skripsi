import React from 'react';
import Routers from './routes/routes';

export const apiUrl = "http://178.128.107.238:5000/api/device/plantA/allDevice";
export const apiPost = "http://178.128.107.238:5000/api/device/plantA";
export const apiDelete = "http://178.128.107.238:5000/api";
export const tenantUrl = "http://178.128.107.238:5000/api/tenant/allPlant";
export const tenantPost = "http://178.128.107.238:5000/api/tenant"
export const tenantDelete = "http://178.128.107.238:5000/api";

const App: React.FC = () => {
  return (
    <div className='main-container'>
      <Routers />
    </div>
  );
};

export default App;
