import React, { useState, useEffect } from 'react';
import TenantModal from './tenantModal';
import AddTenant from '../tenantApi/addTenant';

interface AddModalProps {
  tenantUrl: string;
  tenantPost: string;
  show: boolean;
  handleClose: () => void;
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
}

const TenantAddModal: React.FC<AddModalProps> = ({
  tenantUrl,
  tenantPost,
  show,
  handleClose,
  tenanData,
  setTenanData,
}) => {

  /*const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      console.log('Data saved successfully!');
      AddTenant(tenantPost, tenanData.plantName, tenanData.address, tenanData.description)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });

    } else {
      console.log('Save operation canceled.');
    }
    handleClose();
  };*/


  return (
    <TenantModal
      title="Add New Tenant"
      titleButton='Save'
      tenantUrl={tenantUrl}
      tenantPost={tenantPost}
      show={show}
      handleClose={handleClose}
      tenanData={tenanData}
      setTenanData={setTenanData}
      isEdit={false}
      showDeleteButton={false}
    />
  );
};

export default TenantAddModal;
