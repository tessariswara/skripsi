import React, { useState, useEffect } from 'react';
import DeviceModal from './deviceModal';
import UpdateDevice from '../deviceApi/updateDevice';

interface EditModalProps {
  apiUrl: string;
  apiPost: string;
  apiDelete: string;
  show: boolean;
  handleClose: () => void;
  serialNumberSelected,
  deviceData: {
    serialNumber: string;
    deviceName: string;
    machineName: string;
    plant: string;
    description: string;
  };
  setDeviceData: React.Dispatch<React.SetStateAction<{
    serialNumber: string;
    deviceName: string;
    machineName: string;
    plant: string;
    description: string;
  }>>;
  showDeleteButton: boolean;
}

const DeviceEditModal: React.FC<EditModalProps> = ({
  apiUrl,
  apiPost,
  apiDelete,
  show,
  handleClose,
  deviceData,
  setDeviceData,
  showDeleteButton, 
  serialNumberSelected,
}) => {
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      console.log('Data updated successfully!');
      console.log(deviceData.plant)
     
      UpdateDevice(apiPost + '/' + deviceData.serialNumber, deviceData.serialNumber, deviceData.deviceName, deviceData.machineName, deviceData.plant, deviceData.description);
    } else {
      console.log('Update operation canceled.');
    }

    handleClose();
  };
  

  return (
    <DeviceModal
      title="Edit Device"
      titleButton='Update'
      apiUrl={apiUrl}
      apiPost={apiPost}
      apiDelete={apiDelete}
      show={show}
      handleClose={handleClose}
      handleConfirmation={handleConfirmation}
      deviceData={deviceData}
      setDeviceData={setDeviceData}
      showDeleteButton={true} 
      isEdit={true}
    />


  );
};

export default DeviceEditModal;