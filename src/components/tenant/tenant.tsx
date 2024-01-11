import React, { useState } from 'react';
import DataGridDemo from '../tenant/tenantTable';
import "../../styles/device.css";
import "../../index.css"
import TenantModal from './tenantModal/tenantModal';
import TenantAddModal from './tenantModal/tenantAddModal';
import TenantEditModal from './tenantModal/tenantEditModal';
import { tenantPost, tenantUrl, tenantDelete } from '../../App';;
import { tenantData } from './tenantApi/hitTenant';

const Tenant: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [tenanData, setTenanData] = useState({
    plantName: '',
    address: '',
    description: '',
  });

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  
  return (
    <div className='page-container'>
      <div className='border-container'>
        <div className='content-container'>
          <div className='page-header'>
            <div className='page-title'>
              <h1>Tenant Management</h1>
            </div>
            <div className='page-control'>
              <button className='button' onClick={handleShowAddModal}>
                Add Tenant
              </button>
              <button className='button' onClick={handleShowEditModal}>
                Edit Tenant
              </button>
            </div>
          </div>
          <div className='page-search'>
            <input
              type="text"
              placeholder='Search for anything'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className='page-table'>
            <DataGridDemo tenantUrl={tenantUrl} searchText={searchText} />
            <TenantAddModal
              show={showAddModal}
              handleClose={handleCloseAddModal}
              tenantPost={tenantPost}
              tenantUrl={tenantUrl}
              tenanData={tenanData}
              setTenanData={setTenanData}
            />
            <TenantEditModal
              show={showEditModal}
              handleClose={handleCloseEditModal}
              tenantPost={tenantPost}
              tenantUrl={tenantUrl}
              tenanData={tenanData}
              setTenanData={setTenanData}
              tenantDelete={tenantDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenant;
// import React, { useState } from 'react';
// import DataGridDemo from './tenantTable';
// import "../../styles/device.css"
// import "../../index.css"
// import { tenantUrl } from '../../App';
// import { tenantPost } from '../../App';

// const Tenant: React.FC = () => {
//     return (
//         <div className='page-container'>
//             <div className='border-container'>
//                 <div className='content-container'>
//                     <div className='page-header'>
//                         <div className='page-title'>
//                             <h1>Tenant Management</h1>
//                         </div>
//                         <div className='page-control'>
//                             <button className='button'>Add Tenant</button>
//                             <button className='button'>Edit Tenant</button>
//                         </div>
//                     </div>
//                     <div className='page-search'>
//                         <input type="text" placeholder='Search for anything' />
//                     </div>
//                     <div className='page-table'>
//                         <DataGridDemo tenantUrl={tenantUrl} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tenant;
