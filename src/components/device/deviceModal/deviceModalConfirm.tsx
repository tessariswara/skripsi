import React from 'react';

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
          <p>Are you sure your input data is correct?</p>
        </div>
        <div className="modal-cta confirm">
          <button className="button cancel" onClick={() => handleConfirmation(false)}>
            Cancel
          </button>
          {isDelete ? (
              <button className="button" onClick={() => handleConfirmation(true)}>
              Submit
              </button>
          ):(
            <button className="button" onClick={() => handleConfirmation(true)}>
            Delete
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceModalConfirm;
