import React from 'react';

interface ModalConfirmProps {
  show: boolean;
  handleConfirmation: (confirmed: boolean) => void;
}

const DeviceModalConfirm: React.FC<ModalConfirmProps> = ({ show, handleConfirmation }) => {
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
          <button className="button" onClick={() => handleConfirmation(true)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceModalConfirm;
