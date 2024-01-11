import React, { useState, useEffect } from 'react';
import TenantModalConfirm from './tenantModalConfirm';
import Select from 'react-select';
import '../../../styles/device.css';
// import { deleteDeviceApi } from '../deviceApi/deleteDevice';
import { deleteTenantApi } from '../tenantApi/deleteTenant'
import "../../../styles/device.css"
import TenantEditModal from './tenantEditModal';
import { tenData, TenDataItem } from '../tenantTable';


interface ModalProps {
  title: string;
  titleButton: string;
  tenantUrl: string;
  tenantPost: string;
  tenantDelete: string;
  show: boolean;
  showDeleteButton?: boolean;
  handleClose: () => void;
  handleConfirmation: (confirmed: boolean) => void;
  isEdit,
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

const TenantModal: React.FC<ModalProps> = ({
  title,
  titleButton,
  tenantUrl,
  tenantPost,
  tenantDelete,
  show,
  showDeleteButton,
  handleClose,
  handleConfirmation: propHandleConfirmation,
  tenanData,
  setTenanData,
  isEdit,
}) => {
  const [isDelete, setIsDelete] = useState(true);
  const [plantSelected, setPlantSelected] = useState(false);

  const [plantName, setPlantName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState<string>('');

  const [options, setOptions] = useState([]);
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
    const bismillah = async () => {
      try {
        const filteredLagi: TenDataItem[] = (tenData || []).map((item) => ({
        namaPlant: item.id,
        alamat: item.lastName,
        deskripsi: item.firstName,
      }));
        setTenanData(filteredLagi);
        console.log("ini bos", tenData)
        const formattedOptions: TenDataItem[] = (tenData || []).map((item) => ({
          value: item.id,
          label: item.id,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        // kosongin aza
      }
    };
  
    bismillah();
  }, [tenData]);

  const handleCombinedChange = selectedOption => {
    handleSelectChange(selectedOption);
  };
  
  const handleSelectChange = (selectedOption) => {
    const selectedPlantName = selectedOption.value;
    const selectedTenant = tenanData.find((item) => item.namaPlant === selectedPlantName);
    if (selectedTenant) {
      setPlantSelected(true);
      setPlantName(selectedPlantName);
      setAddress(selectedTenant.alamat || '');
      setDescription(selectedTenant.deskripsi || '');
    }
  };

  const forceUpdate = () => {
    setForceUpdateKey((prevKey) => prevKey + 1);
  };

  const handleSave = () => {
    if (plantName && address && description) {
      setTenanData({
        plantName,
        address,
        description,
      });
      setShowConfirmationModal(true);
      console.log("cek plant", plantName, address, description)
      setError('');
    } else {
      setError('**Please fill all input forms');
    }
  };

  const handleDelete = async () => {
    if (plantName && address && description) {
        setTenanData({
          plantName,
          address,
          description,
        });
      setIsDelete(false)
      setShowConfirmationModal(true);
      try {
        await deleteTenantApi(tenantDelete, address, [plantName]);
        console.log('Data deleted successfully!');
      } catch (error) {
        console.error('Error deleting device:', error.message);
      }
    } else {
      setError('**Please fill all input forms');
    }
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
    setPlantName('');
    setAddress('');
    setDescription('');
    setError('');
    setPlantSelected(false);
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
            <label>Plant Name</label>
            {isEdit ? (
                <Select
                styles={selectStyle}
                placeholder="Select Plant Name..."
                value={plantName !== '' ? { value: plantName, label: plantName } : null}
                onChange={handleCombinedChange}
                options={options}
              />
            ) : (
                <input
                className='joss'
                type="text"
                placeholder="Enter Plant Name"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
              />
            )}
          </div>

          <div className="modal-column">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isEdit && !plantSelected}
            />
          </div>


          <div className="modal-column">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isEdit && !plantSelected}
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

      <TenantModalConfirm
        show={showConfirmationModal}
        handleConfirmation={handleConfirmation}
        isDelete={isDelete}
      />

    </div>
  );
};

export default TenantModal;


// GAK KEPAKE TAPI LUMAYAN BUAT BACKUP

// import { fetchDataFromApi } from '../deviceApi/deviceHitApi';
// import { fetchDataFromTenant } from '../../tenant/tenantApi/tenantHitApi';    1
// import { tenantUrl } from '../../../App';
// import { fetchData, cachedData } from '../deviceApi/hitApi';

  //   const fetchDa = async () => {
  //     try {
  //       const apiLagi = await fetchDataFromApi(apiUrl);
  //       const filteredLagi = apiLagi.map((item) => ({
  //         serNum: item.serial_number,
  //         namDev: item.nama_device,
  //         nameMac: item.mesin,
  //         namPla: item.plant,
  //         namDesc: item.deskripsi,
  //       }));
  //       setDeviceData(filteredLagi);
  //       const formattedOptions = apiLagi.map(item => ({
  //         value: item.serial_number,
  //         label: item.serial_number,
  //       }));
  //       setOptions(formattedOptions);
  //     } catch (error) {
  //       console.error("Error setting device data:", error.message);
  //       setError("Error fetching data from server. Please try again.");
  //     }
  //   };
  //   const fetchPlants = async () => {
  //     try {
  //       const plants = await fetchDataFromTenant(tenantUrl);
  //       const plantOptions = plants.map((item) => ({
  //         value: item.plant_name,
  //         label: item.plant_name,
  //       }));
  //       setPlantOptions(plantOptions);
  //     } catch (error) {
  //       console.error("Error fetching plant options:", error.message);
  //       setPlantOptions([]); 
  //     }
  //   };
    
  //   fetchPlants();
  //   fetchDa();
  // useEffect(() => {
  //   const fetchPlants = async () => {
  //     try {
  //       const plants = await fetchDataFromTenant(tenantUrl);
  //       const plantOptions = plants.map((item) => ({
  //         value: item.plant_name,
  //         label: item.plant_name,
  //       }));
  //       setPlantOptions(plantOptions);
  //     } catch (error) {
  //       console.error("Error fetching plant options:", error.message);
  //       setPlantOptions([]); 
  //     }
  //   };
  //   return ()=> fetchPlants();
  // }, [])
