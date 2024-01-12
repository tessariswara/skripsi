import React, { useState, useEffect } from 'react';
import DeviceModalConfirm from './deviceModalConfirm';
import Select from 'react-select';
import '../../../styles/device.css';
import { deleteDeviceApi } from '../deviceApi/deleteDevice';
import "../../../styles/device.css"
import DeviceEditModal from './deviceEditModal';
import { mappedData, MappedDataItem } from '../deviceTable';
import { tenData, TenDataItem } from '../../device/deviceTable';


interface ModalProps {
  title: string;
  titleButton: string;
  apiUrl: string;
  apiPost: string;
  apiDelete: string;
  show: boolean;
  showDeleteButton: boolean;
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
  showDeleteButton,
  handleClose,
  handleConfirmation: propHandleConfirmation,
  deviceData,
  setDeviceData,
  isEdit,
}) => {
  const [isDelete, setIsDelete] = useState(true);
  const [serialNumberSelected, setSerialNumberSelected] = useState(false);
  const [resetData, setResetData] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [machineName, setMachineName] = useState('');
  const [plant, setPlant] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [options, setOptions] = useState([]);
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


  useEffect(() => {
    const damn = async () => {
      try {
        const filteredLagi: MappedDataItem[] = (mappedData || []).map((item) =>>
        serNum: item.id,
        namDev: item.namDev,
        nameMac: item.namMac,
        namPla: item.namPla,
        namDesc: item.namDesc,
      }));
        setDeviceData(filteredLagi);
        const formattedOptions: MappedDataItem[] = (mappedData || []).map((item) => ({
          value: item.id,
          label: item.id,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        // console.error('Gagal menerima informasi : ', error);
      }
    };

    damn();
  }, [mappedData,resetData]);

  useEffect(() => {
    const tnt = async () => {
      try {
        const tenantOpt: TenDataItem[] = (tenData || []).map((item) => ({
          value: item.namaplant,
          label: item.namaplant,
        }));
        console.log("ini bos", tenData)
        setPlantOptions(tenantOpt);
      } catch (error) {
        console.error("Error fetching plant options:", error.message);
        setPlantOptions([]);
      }
    };
    tnt();
  }, [tenData]);



  const handleCombinedChange = selectedOption => {
    handleSelectChange(selectedOption);
  };

  const handleSelectChange = (selectedOption) => {
    const selectedSerialNumber = selectedOption.value;
    const selectedDevice = deviceData.find((item) => item.serNum === selectedSerialNumber);


    if (selectedDevice) {
      setSerialNumberSelected(true);

      setSerialNumber(selectedSerialNumber);
      setDeviceName(selectedDevice.namDev || '');
      setMachineName(selectedDevice.nameMac || '');
      setPlant(selectedDevice.namPla || '');
      setDescription(selectedDevice.namDesc || '');
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
      console.log("ini device data", serialNumber)
      setError('');
    } else {
      setError('**Please fill all input forms');
    }
  };

  const handleDelete = async () => {
    if (serialNumber && deviceName && machineName && plant && description) {
      setDeviceData({
        serialNumber,
        deviceName,
        machineName,
        plant,
        description,
      });
      setIsDelete(false)
      setShowConfirmationModal(true);
    } else {
      setError('**Please fill all input forms');
    }
  };

  const handleConfirmation = (confirmed: boolean, isDelete) => {
    setShowConfirmationModal(false);
    setResetData(!resetData);
    if (confirmed) {
      console.log('Data saved successfully!');
      propHandleConfirmation(true,isDelete);
    } else {
      console.log('Save operation canceled.');
      propHandleConfirmation(false);
    }
    setIsDelete(true);
  };

  const resetForm = () => {
    setSerialNumber('');
    setDeviceName('');
    setMachineName('');
    setPlant('');
    setDescription('');
    setError('');
    setSerialNumberSelected(false);
  };

  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

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
