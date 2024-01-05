import React, {useState, useEffect} from 'react';
import DeviceEditModal from './deviceEditModal';
import UpdateDevice from '../deviceApi/updateDevice';
import { deleteDeviceApi } from '../deviceApi/deleteDevice';
import AddDevice from '../deviceApi/addDevice';

interface ModalConfirmProps {
  titleButton: string;
  show: boolean;
  handleClose: () => void;
  handleConfirmation: (confirmed: boolean) => void;
  isDelete: boolean;
  deviceData: {
    serialNumber: string;
    deviceName: string;
    machineName: string;
    plant: string;
    description: string;
  };
}

const DeviceModalConfirm: React.FC<ModalConfirmProps> = ({
   titleButton,
   show,
   handleClose,
   handleConfirmation,
   isDelete,
   apiPost,
   apiDelete,
   deviceData
   }) => {
   const [flagDelete, setFlagDelete] = useState(true);
   const [save, setSave] = useState(true);
   const [cancle, setCancle] = useState(true);

   const clickDelete = (e) => {
    e.preventDefault();
    setFlagDelete(!flagDelete);
    setCancle(!cancle);
   };

   const clickSave = (e) => {
    e.preventDefault();
    setSave(!save);
    setCancle(!cancle);
   };

   const clickCancle = (e) => {
    e.preventDefault();
    setCancle(!cancle);
   };

   useEffect(() => {
    const crudDevice = async () => {
     if (!isDelete && !flagDelete) {
      console.log('Data deleted successfully!');
      setFlagDelete(!flagDelete);
      deleteDeviceApi(apiDelete, deviceData.plant, [deviceData.serialNumber])
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });
      setFlagDelete(!flagDelete);
      //handleConfirmation(true);
     } else if (titleButton === "Update" && !save) {
      console.log('Data updated successfully!');
      setSave(!save);
      UpdateDevice(apiPost + '/' + deviceData.serialNumber, deviceData.serialNu>
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });
      //handleConfirmation(true);
     } else if (titleButton === "Save" && !save) {
      console.log('Data saved successfully!');
      setSave(!save);
      AddDevice(apiPost, deviceData.serialNumber, deviceData.deviceName, device>
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });
      //handleConfirmation(true);
     } else {
      console.log('Operation canceled.');
      handleConfirmation(false);
     }
    };

    crudDevice();
   }, [cancle]);

  return (
    <div className={`modal ${show ? 'visible' : 'hidden'}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h1>Please Confirm</h1>
        </div>
        <div className="modal-column confirm">
        {isDelete ? (
            <p>Are you sure your input data is correct?</p>
          ):(
            <p>Are you sure delete your data?</p>
          )}
        </div>
        <div className="modal-cta confirm">
          <button className="button cancel" onClick={clickCancle}>
            Cancel
          </button>
          {isDelete ? (
              <button className="button" onClick={clickSave}>
                Save
              </button>
          ):(
            <button className="button" onClick={clickDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceModalConfirm;
