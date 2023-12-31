import React, { useState } from 'react';
import DataGridDemo from './tenantTable';
import "../../styles/device.css"
import "../../index.css"
import { tenantUrl } from '../../App';
import { tenantPost } from '../../App';

const Tenant: React.FC = () => {
    return (
        <div className='page-container'>
            <div className='border-container'>
                <div className='content-container'>
                    <div className='page-header'>
                        <div className='page-title'>
                            <h1>Tenant Management</h1>
                        </div>
                        <div className='page-control'>
                            <button className='button'>Add Tenant</button>
                            <button className='button'>Edit Tenant</button>
                        </div>
                    </div>
                    <div className='page-search'>
                        <input type="text" placeholder='Search for anything' />
                    </div>
                    <div className='page-table'>
                        <DataGridDemo tenantUrl={tenantUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tenant;
