import React from 'react';
import DeviceEditModal from './deviceEditModal';

interface ModalConfirmProps {
  show: boolean;
  handleConfirmation: (confirmed: boolean) => void;
  isDelete: boolean;
}

const DeviceModalConfirm: React.FC<ModalConfirmProps> = ({ show, handleConfirmation, isDelete }) => {

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
          <button className="button cancel" onClick={() => handleConfirmation(false, isDelete)}>
            Cancel
          </button>
          {isDelete ? (
              <button className="button" onClick={() => handleConfirmation(true, isDelete)}>
                Save
              </button>
          ):(
            <button className="button" onClick={() => handleConfirmation(true,isDelete)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceModalConfirm;
