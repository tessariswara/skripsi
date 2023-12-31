import React, { useState, useEffect } from 'react';
import DeviceModal from './deviceModal';
import AddDevice from '../deviceApi/addDevice';

interface AddModalProps {
  apiUrl: string;
  apiPost: string;
  show: boolean;
  handleClose: () => void;
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
}

const DeviceAddModal: React.FC<AddModalProps> = ({
  apiUrl,
  apiPost,
  show,
  handleClose,
  deviceData,
  setDeviceData,
}) => {

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      console.log('Data saved successfully!');
      AddDevice(apiPost, deviceData.serialNumber, deviceData.deviceName, deviceData.machineName, deviceData.plant, deviceData.description);
    } else {
      console.log('Save operation canceled.');
    }

    handleClose();
  };
  

  return (
    <DeviceModal
      title="Add New Device"
      titleButton='Save'
      apiUrl={apiUrl}
      apiPost={apiPost}
      show={show}
      handleClose={handleClose}
      handleConfirmation={handleConfirmation}
      deviceData={deviceData}
      setDeviceData={setDeviceData}
      isEdit={false}
    />
  );
};

export default DeviceAddModal;