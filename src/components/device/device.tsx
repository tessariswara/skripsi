import React, { useState } from 'react';
import DataGridDemo from './deviceTable';
import "../../styles/device.css"
import "../../index.css"
import DeviceModal from './deviceModal/deviceModal';


const apiUrl = "http://178.128.107.238:5000/api/device/plantA/allDevice";
const apiPost = "http://178.128.107.238:5000/api/device/plantA";

const Device: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className='page-container'>
      <div className='border-container'>
        <div className='content-container'>
          <div className='page-header'>
            <div className='page-title'>
              <h1>Device Management</h1>
            </div>
            <div className='page-control'>
              <button className='button' onClick={handleShowModal}>Add Device</button>
              <button className='button'>Edit Device</button>
            </div>
          </div>
          <div className='page-search'>
            <input type="text" placeholder='Search for anything' />
          </div>
          <div className='page-table'>
            <DataGridDemo apiUrl={apiUrl} />
            <DeviceModal show={showModal} handleClose={handleCloseModal} apiPost={apiPost} apiUrl={apiUrl}/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Device;