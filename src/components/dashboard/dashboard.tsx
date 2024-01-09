import React, {useState, useEffect, ChangeEvent } from 'react';
import { allData } from './showData.tsx';

const Dashboard: React.FC = () => {
    const [value, setValue] = useState('');

    const hitApi = () => {
      console.log(value);
      allData(value);
    };

    return (
        <div className='page-container'>
            <div className='border-container'>
                <div className='content-container'>
                    <h1>Dashboard</h1>
                    <h2>Ini Dashboard</h2>
                </div>
                <input
                type="text"
                placeholder="Enter Serial Number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
                <p> {value} </p>
                <button onClick={hitApi}>
                  Download
                </button>
            </div>
        </div>
    );
};

export default Dashboard;


