import React from 'react';
import '../../styles/dashboard.css';

interface CardProps {
  flag: string;
  status: string;
  serialNumber: string;
  deviceName: string;
  temperature: number;
}

const Card: React.FC<CardProps> = ({flag, status, serialNumber, deviceName, temperature }) => {
    const contClass = () => {
        if (flag === 'temperature') {
          return 'card-content-container temperature';
        } else if (flag === 'humudity') {
          return 'card-content-container humidity';
        } else if (flag === 'pressure') {
            return 'card-content-container humidity';
        } else {
          return 'card-content-container others';
        }
      };

      const sensorType = () => {
        if (flag === 'temperature') {
          return 'Temperature Now';
        } else if (flag === 'humudity') {
          return 'Humidity Now';
        } else if (flag === 'pressure') {
            return 'Pressure Now';
        } else {
          return 'Condition Now';
        }
      };

      const satuan = () => {
        if (flag === 'temperature') {
          return '°C';
        } else if (flag === 'humudity') {
          return '%';
        } else if (flag === 'pressure') {
            return 'Psi';
        } else {
          return 'N/A';
        }
      };


      const sts = () => {
        if (status === 'Connected') {
          return 'rnd connect';
        } else {
          return 'rnd';
        }
      };
    
    return (
    <div className={contClass()}>
      <div className="content">
        <span>
          <div className="content ser">
            <p>Serial Number</p>
            <h2>{serialNumber}</h2>
          </div>
          <div className="content status">
            <div className={sts()}></div>
          </div>
        </span>
      </div>
      <div className="content dev">
        <p>Device Name</p>
        <h3>{deviceName}</h3>
      </div>
      <div className="content val">
        <p>{sensorType()}</p>
        <div className="content value">
          <h1><span>{temperature}</span></h1>
          <h2>{satuan()}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
