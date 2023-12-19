import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Dashboard from '../components/dashboard/dashboard';
import Device from '../components/device/device';
import Logging from '../components/logging/logging';
import Tenant from '../components/tenant/tenant';

const Routers: React.FC = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Device />} />
          <Route path="/log" element={<Logging />} />
          <Route path="/tenant" element={<Tenant />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
 