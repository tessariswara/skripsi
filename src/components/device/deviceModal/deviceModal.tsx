import React, { useState, useEffect } from 'react';
import DeviceModalConfirm from './deviceModalConfirm';
import Select from 'react-select';
import '../../../styles/device.css';
import { fetchDataFromApi } from '../deviceApi/deviceHitApi';
import { fetchDataFromTenant } from '../../tenant/tenantApi/tenantHitApi';
import { tenantUrl } from '../../../App';
import { deleteDeviceApi } from '../deviceApi/deleteDevice';
import "../../../styles/device.css"
import DeviceEditModal from './deviceEditModal';

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
  setDeviceData,
  isEdit,
}) => {
  const [isDelete, setIsDelete] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const [serialNumber, setSerialNumber] = useState('');
  const [options, setOptions] = useState([]);
  const [serialNumberSelected, setSerialNumberSelected] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [machineName, setMachineName] = useState('');
  const [plant, setPlant] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [plantOptions, setPlantOptions] = useState<string[]>([]);
  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const selectStyle = {
    control: (provided: any, state: { isDisabled: boolean }) => ({
      ...provided,
      fontSize: '16px',
      padding: '0 0 0 15px',
      border: 0,
      borderRadius: '10px',
      backgroundColor: state.isDisabled ? 'lightgray' : 'white',
      height: '62.33px',
    }),
    option: (provided: any) => ({
      ...provided,
    }),
  };

  const handleCombinedChange = selectedOption => {
    handleSelectChange(selectedOption);
    setSerialNumber(selectedOption.value);
  };
  
  const handleSelectChange = (selectedOption) => {
    const selectedSerialNumber = selectedOption.value;
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

  const forceUpdate = () => {
    setForceUpdateKey((prevKey) => prevKey + 1);
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

  const handleDelete = () => {
    setDeviceData({
      serialNumber,
      deviceName,
      machineName,
      plant,
      description,
    });
    setIsDelete(false)
    setShowConfirmationModal(true);
    // try {
    //   await deleteDeviceApi(apiDelete, plant, [serialNumber]);
    //   console.log('Data deleted successfully!');
    //   forceUpdate();
    //   handleClose();
    // } catch (error) {
    //   console.error('Error deleting device:', error.message);
    // }
  };
  const handleConfirmation = (confirmed: boolean) => {
    setShowConfirmationModal(false);

    if (confirmed) {
      console.log('Data saved successfully!');
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
    setPlant(deviceData?.plant || '');
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
        const formattedOptions = apiLagi.map(item => ({
          value: item.serial_number,
          label: item.serial_number,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error setting device data:", error.message);
        setError("Error fetching data from server. Please try again.");
      }
    };
    // const fetchPlants = async () => {
    //   try {
    //     const plants = await fetchDataFromTenant(tenantUrl);
    //     const plantOptions = plants.map((item) => ({
    //       value: item.plant_name,
    //       label: item.plant_name,
    //     }));
    //     setPlantOptions(plantOptions);
    //   } catch (error) {
    //     console.error("Error fetching plant options:", error.message);
    //     setPlantOptions([]); 
    //   }
    // };
    
    // fetchPlants();
    fetchDa();
    if (show) {
      resetForm();
    }
  }, [show]); 
  
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plants = await fetchDataFromTenant(tenantUrl);
        const plantOptions = plants.map((item) => ({
          value: item.plant_name,
          label: item.plant_name,
        }));
        setPlantOptions(plantOptions);
      } catch (error) {
        console.error("Error fetching plant options:", error.message);
        setPlantOptions([]); 
      }
    };
    return ()=> fetchPlants();
  }, [])

  return (
    <div key={forceUpdateKey}>
      <div className={`modal ${show ? 'visible' : 'hidden'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h1>{title}</h1>
          </div>

          <div className="modal-colmn">
            <label>Serial Number</label>
            {isEdit ? (
                <Select
                styles={selectStyle}
                placeholder="Select Serial Number..."
                value={serialNumber !== '' ? { value: serialNumber, label: serialNumber } : null}
                onChange={handleCombinedChange}
                options={options}
              />
            ) : (
                <input
                className='joss'
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

          <div className="modal-colmn">
            <label>Plant</label>
            <Select
              styles={selectStyle}
              placeholder="Select Plant..."
              value={plant !== '' ? { value: plant, label: plant } : null}
              onChange={(e) => setPlant(e.value)}
              options={plantOptions}
              isDisabled={isEdit && !serialNumberSelected}  
              />
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
        isDelete={isDelete}
      />
    </div>
  );
};

export default DeviceModal;
