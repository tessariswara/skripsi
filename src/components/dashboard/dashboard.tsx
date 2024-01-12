import React, {useState, useEffect, ChangeEvent } from 'react';
import "../../styles/dashboard.css"
import logoPlant from  "../../assets/Vector.svg"
import {dataDash, allData} from "../dashboard/showData.tsx"
import Card from './card.tsx';

interface CardData {
    flag: string;
    serialNumber: string;
    deviceName: string;
    temperature: number;
  }

const Dashboard: React.FC = () => {
    const [value, setValue] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [cardData, setCardData] = useState<CardData[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hitApi = async () => {
        await allData(value);
        console.log("ini dataDash", dataDash);
        setCardData(dataDash);
      };

      useEffect(() => {
      }, [cardData]);

    

    return (
        <div className='page-container'>
            <div className='border-container'>
                <div className='content-container'>
                    <div className='control'>
                        <div className='page-header'>
                            <div className='page-title'>
                                <h2>{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                                <h1><span>Hello, Mang Ujang <br /> Welcome back!</span></h1>
                                <p>Welcome to the cutting-edge world of PT Project Technology Mast and Controlling System, where control meets simplicity, and efficiency reigns supreme.</p>
                            </div>
                            <div className='page-control'>
                                <div className='page-plant'>
                                    <h3>Plant Monitoring</h3>
                                    <div className='page-plant-card'>
                                        <div className='logo'>
                                            <img src={logoPlant}></img>
                                        </div>
                                        <div className='text'>
                                            <h2>Plant A</h2>
                                            <p>Jalan Industri X No. 123</p>
                                        </div>
                                    </div>
                                    <div className='page-plant-card'>
                                        <div className='logo'>
                                            <img src={logoPlant}></img>
                                        </div>
                                        <div className='text'>
                                            <h2>Plant B</h2>
                                            <p>Jalan Industri X No. 123</p>
                                        </div>
                                    </div>
                                    <div className='page-plant-card'>
                                        <div className='logo'>
                                            <img src={logoPlant}></img>
                                        </div>
                                        <div className='text'>
                                            <h2>Plant C</h2>
                                            <p>Jalan Industri X No. 123</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='monitor'>
                        <div className='card-container'>
                            <div className='card-header'>
                                <div className='card-title'>
                                    <h1>Monitoring Widget</h1>
                                </div>
                                <div className='card-control'>
                                    <input
                                        type="text"
                                        placeholder="Enter Serial Number"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                    <button onClick={hitApi}>
                                        Add
                                    </button>
                                    <button>
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className='card-content'>
                                <div className='card-plant'>
                                    <h2>Plant A</h2>
                                </div>
                                <div className='card-content-isi'>
                                    {cardData?.map((data, index) => (
                                        <Card
                                        key={index}
                                        flag={data.flag}
                                        status={data.status}
                                        serialNumber={data.serial_number}
                                        deviceName={data.nama_device}
                                        temperature={data.value.toFixed(2)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


