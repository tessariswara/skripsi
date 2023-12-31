import React, { useState, useEffect } from 'react';
import DeviceModalConfirm from './deviceModalConfirm';
import '../../../styles/device.css';
import { fetchDataFromApi } from '../deviceApi/deviceHitApi';
import { fetchDataFromTenant } from '../../tenant/tenantApi/tenantHitApi';
import { tenantUrl } from '../../../App';
import { deleteDeviceApi } from '../deviceApi/deleteDevice';

interface ModalProps {
  title: string;
  titleButton: string;
  apiUrl: string;
  apiPost: string;
  apiDelete: string;
  show: boolean;
  showDeleteButton?: boolean;
  handleClose: () => void;
  handleConfirmation: (confirmed: boolean) => void;
  isEdit,
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

const DeviceModal: React.FC<ModalProps> = ({
  title,
  titleButton,
  apiUrl,
  apiPost,
  apiDelete,
  show,
  handleClose,
  handleConfirmation: propHandleConfirmation,
  deviceData,
  showDeleteButton,
  setDeviceData,
  isEdit,
  isDelete,
}) => {
  const [uhuy, setUhuy] = useState(true);
  const [serialNumber, setSerialNumber] = useState('');
  const [serialNumberSelected, setSerialNumberSelected] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [machineName, setMachineName] = useState('');
  const [plant, setPlant] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [plantOptions, setPlantOptions] = useState<string[]>([]);

  const handleCombinedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectChange(event);
    setSerialNumber(event.target.value);
  };
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSerialNumber = event.target.value;
    const selectedDevice = deviceData.find((item) => item.serNum === selectedSerialNumber);
    setSerialNumber(selectedSerialNumber);
    setDeviceName(selectedDevice?.namDev || '');
    setMachineName(selectedDevice?.nameMac || '');
    if (selectedDevice) {
      setPlant(selectedDevice.namPla || '');
      setDescription(selectedDevice.namDesc || '');
      setSerialNumberSelected(true);
    }
  };

  const handleSave = () => {
    if (serialNumber && deviceName && machineName && plant && description) {
      setDeviceData({
        serialNumber,
        deviceName,
        machineName,
        plant,
        description,
      });
      console.log(plant)
      setShowConfirmationModal(true);
      setError('');
    } else {
      setError('**Please fill all input forms');
    }
  };

  const handleDelete = async () => {
    console.log('Serial Number:', serialNumber); 
    setUhuy(false);
    try {
      await deleteDeviceApi(apiDelete, plant, [serialNumber]);
      console.log('Data deleted successfully!');
      handleClose();
    } catch (error) {
      console.error('Error deleting device:', error.message);
    }
  };
  console.log("Ini plant", plant)

  const handleConfirmation = (confirmed: boolean) => {
    setShowConfirmationModal(false);

    if (confirmed) {
      console.log('Data saved successfully!');
      console.log(serialNumber, deviceName, machineName, plant);
      propHandleConfirmation(true);
    } else {
      console.log('Save operation canceled.');
      propHandleConfirmation(false);
    }

    handleClose();
  };

  const resetForm = () => {
    setSerialNumber('');
    setDeviceName('');
    setMachineName('');
    setPlant(deviceData?.plant || ''); // Menggunakan nilai plant dari deviceData
    setDescription('');
    setError('');
    setSerialNumberSelected(false);
  };

  useEffect(() => {
    const fetchDa = async () => {
      try {
        const apiLagi = await fetchDataFromApi(apiUrl);
        const filteredLagi = apiLagi.map((item) => ({
          serNum: item.serial_number,
          namDev: item.nama_device,
          nameMac: item.mesin,
          namPla: item.plant,
          namDesc: item.deskripsi,
        }));
        setDeviceData(filteredLagi);
      } catch (error) {
        console.error("Error setting device data:", error.message);
        setError("Error fetching data from API. Please try again.");
      }
    };

    const fetchPlants = async () => {
      try {
        const plants = await fetchDataFromTenant(tenantUrl);
        const plantOptions = plants.map((item) => ({
          Pla: item.plant_name,
        }));
        setPlantOptions(plantOptions);
      } catch (error) {
        console.error("Error fetching plant options:", error.message);
        setPlantOptions([]); 
      }
    };

    fetchPlants();
    fetchDa();
    if (show) {
      resetForm();
    }
  }, [show, apiUrl, tenantUrl]); 

  return (
    <div>
      <div className={`modal ${show ? 'visible' : 'hidden'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h1>{title}</h1>
          </div>

          <div className="modal-column">
            <label>Serial Number</label>
            {isEdit ? (
              <select value={serialNumber} onChange={handleCombinedChange}>
                <option value="" >Select Serial Number...</option>
                {Array.isArray(deviceData) &&
                  deviceData.map((item) => (
                    <option key={item.serNum} value={item.serNum}>
                      {item.serNum}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Enter Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            )}
          </div>

          <div className="modal-column">
            <label>Device Name</label>
            <input
              type="text"
              placeholder="Enter Device Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              disabled={isEdit && !serialNumberSelected}
            />
          </div>

          <div className="modal-column">
            <label>Machine Name</label>
            <input
              type="text"
              placeholder="Enter Machine Name"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              disabled={isEdit && !serialNumberSelected}
            />
          </div>

          <div className="modal-column">
            <label>Plant</label>
            <select value={plant} disabled={isEdit && !serialNumberSelected} onChange={(e) => setPlant(e.target.value)}
            >
              <option value="" disabled={!serialNumberSelected}>Select Plant...</option>
              {Array.isArray(deviceData) &&
                plantOptions.map((item) => (
                  <option key={item.Pla} value={item.Pla}>
                    {item.Pla}
                  </option>
                ))}
            </select>
          </div>

          <div className="modal-column">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isEdit && !serialNumberSelected}
            />
            {error && <p className='error'>{error}</p>}
          </div>

          <div className="modal-cta">
            <button className="button cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="button" onClick={handleSave}>
              {titleButton}
            </button>
            {showDeleteButton && (
              <button className="button delete" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <DeviceModalConfirm
        show={showConfirmationModal}
        handleConfirmation={handleConfirmation}
        isDelete={uhuy}
      />
    </div>
  );
};

export default DeviceModal;
