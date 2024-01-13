import React, { useState, useEffect } from 'react';
import TenantModal from './tenantModal';
import UpdateTenant from '../tenantApi/updateTenant';
import { deleteTenantApi } from '../tenantApi/deleteTenant';

interface EditModalProps {
  tenantUrl: string;
  tenantPost: string;
  tenantDelete: string;
  show: boolean;
  handleClose: () => void;
  plantSelected,
  isDelete: boolean;
  tenanData: {
    plantName: string;
    address: string;
    description: string;
  };
  setTenanData: React.Dispatch<React.SetStateAction<{
    plantName: string;
    address: string;
    description: string;
  }>>;
  showDeleteButton: boolean;
}


const TenantEditModal: React.FC<EditModalProps> = ({
  tenantUrl,
  tenantPost,
  tenantDelete,
  show,
  handleClose,
  tenanData,
  setTenanData,
}) => {
  /*const [isDelete, setIsDelete] = useState(true);
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && isDelete === false) {
      console.log("apa cik", tenanData.plantName)
      deleteTenantApi(tenantDelete, tenanData.address, [tenanData.plantName])
      .then(() => {
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });

    } else if (confirmed) {
      UpdateTenant(tenantPost + '/' + tenanData.plantName, tenanData.plantName, tenanData.address, tenanData.description)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });
    } else {
      console.log('Update operation canceled.');
      handleClose();
    }
  };*/

  return (
    <TenantModal
      title="Edit Tenant"
      titleButton='Update'
      tenantUrl={tenantUrl}
      tenantPost={tenantPost}
      tenantDelete={tenantDelete}
      show={show}
      handleClose={handleClose}
      tenanData={tenanData}
      setTenanData={setTenanData}
      showDeleteButton={true}
      isEdit={true}
    />
  );
};

export default TenantEditModal;
