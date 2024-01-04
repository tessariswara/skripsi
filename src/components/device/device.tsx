import React, { useState } from 'react';
import DataGridDemo from './deviceTable';
import "../../styles/device.css"
import "../../index.css"
import DeviceModal from './deviceModal/deviceModal';
import DeviceAddModal from './deviceModal/deviceAddModal'; 
import DeviceEditModal from './deviceModal/deviceEditModal';
import { apiPost } from '../../App';
import { apiUrl } from '../../App';
import { apiDelete } from '../../App';

const Device: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [deviceData, setDeviceData] = useState({
    serialNumber: '',
    deviceName: '',
    machineName: '',
    plant: '',
    description: '',
  });

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  
  return (
    <div className='page-container'>
      <div className='border-container'>
        <div className='content-container'>
          <div className='page-header'>
            <div className='page-title'>
              <h1>Device Management</h1>
            </div>
            <div className='page-control'>
              <button className='button' onClick={handleShowAddModal}>
                Add Device
              </button>
              <button className='button' onClick={handleShowEditModal}>
                Edit Device
              </button>
            </div>
          </div>
          <div className='page-search'>
            <input
              type="text"
              placeholder='Search for anything'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className='page-table'>
            <DataGridDemo apiUrl={apiUrl} searchText={searchText} />
            <DeviceAddModal
              show={showAddModal}
              handleClose={handleCloseAddModal}
              apiPost={apiPost}
              apiUrl={apiUrl}
              deviceData={deviceData}
              setDeviceData={setDeviceData}
            />
            <DeviceEditModal
              show={showEditModal}
              handleClose={handleCloseEditModal}
              apiPost={apiPost}
              apiUrl={apiUrl}
              deviceData={deviceData}
              setDeviceData={setDeviceData}
              apiDelete={apiDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Device;