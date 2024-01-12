import React,{useState,useEffect} from 'react';
import TenantEditModal from './tenantEditModal';
import AddTenant from '../tenantApi/addTenant';
import UpdateTenant from '../tenantApi/updateTenant';
import { deleteTenantApi } from '../tenantApi/deleteTenant';

interface ModalConfirmProps {
  show: boolean;
  handleConfirmation: (confirmed: boolean) => void;
  isDelete: boolean;
}

const TenantModalConfirm: React.FC<ModalConfirmProps> = ({
   titleButton,
   show,
   handleConfirmation,
   isDelete,
   apiPost,
   apiDelete,
   tenanData
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
      deleteTenantApi(apiDelete, tenanData.address, [tenanData.plantName])
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });
      //handleConfirmation(true);
     } else if (titleButton === "Update" && !save) {
      console.log('Data updated successfully!');
      setSave(!save);
      UpdateTenant(apiPost + '/' + tenanData.plantName, tenanData.plantName, tenanData.address, tenanData.description)
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
      AddTenant(apiPost, tenanData.plantName, tenanData.address, tenanData.description)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });
      //handleConfirmation(true);
     } else {
      console.log('Operation canceled.');
      handleConfirmation();
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

export default TenantModalConfirm;
