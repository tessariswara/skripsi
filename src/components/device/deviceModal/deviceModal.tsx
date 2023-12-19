import React, { useState, useEffect } from 'react';
import DeviceModalConfirm from './deviceModalConfirm';
import AddDevice from '../deviceApi/addDevice';
import '../../../styles/device.css';

interface ModalProps {
  apiUrl: string;
  apiPost: string;
  show: boolean;
  handleClose: () => void;
}

const DeviceModal: React.FC<ModalProps> = ({ apiUrl, apiPost, show, handleClose }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [machineName, setMachineName] = useState('');
  const [plant, setPlant] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlant(event.target.value);
  };

  const handleSave = () => {
    if (serialNumber && deviceName && machineName && plant && description) {
      setShowConfirmationModal(true);
      setError('');
    } else {
      setError('**Please fill all input forms');
    }
  };

  const handleConfirmation = (confirmed: boolean) => {
    setShowConfirmationModal(false);

    if (confirmed) {
      console.log('Data saved successfully!');
      console.log(serialNumber, deviceName, machineName, plant, description);
      AddDevice(apiPost, serialNumber, deviceName, machineName, plant, description); 
    } else {
      console.log('Save operation canceled.');
    }

    handleClose();
  };

  const resetForm = () => {
    setSerialNumber('');
    setDeviceName('');
    setMachineName('');
    setPlant('');
    setDescription('');
    setError('');
  };

  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

  return (
    <div>
      <div className={`modal ${show ? 'visible' : 'hidden'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h1>Add New Device</h1>
          </div>

          <div className="modal-column">
            <label>Serial Number</label>
            <input
              type="text"
              placeholder="Enter serial number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>

          <div className="modal-column">
            <label>Device Name</label>
            <input
              type="text"
              placeholder="Enter Device Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>

          <div className="modal-column">
            <label>Machine Name</label>
            <input
              type="text"
              placeholder="Enter Machine Name"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
            />
          </div>

          <div className="modal-column">
            <label>Plant</label>
            <select value={plant} onChange={handleSelectChange}>
              <option value="">Select Plant...</option>
              <option value="Plant A">Plant A</option>
              <option value="Plant B">Plant B</option>
              <option value="Plant C">Plant C</option>
            </select>
          </div>

          <div className="modal-column">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && <p className='error'>{error}</p>}
          </div>

          <div className="modal-cta">
            <button className="button cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>

      <DeviceModalConfirm
        show={showConfirmationModal}
        handleConfirmation={handleConfirmation}
      />
    </div>
  );
};

export default DeviceModal;