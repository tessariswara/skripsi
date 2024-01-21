import React, { useState, useEffect, ChangeEvenet } from 'react';
import "../../styles/logging.css"
import "../../index.css"
import { LineChart } from '@mui/x-charts/LineChart';
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
interface Device {
  serial_number: string;
}


const Logging: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [textDateFrom, setTextDateFrom] = useState('Date From');
  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateTo, setDateTo] = useState(null);
  const [textDateTo, setTextDateTo] = useState('Date To');
  const [dateToOpen, setDateToOpen] = useState(false);
  const [xData, setXData] = useState([]);
  const [xData2, setXData2] = useState([]);
  const [yData, setYData] = useState([]);
  const [flagValue, setFlagValue] = useState(false);

  const addHours = (date) => {
  date.setTime(date.getTime() - 25200000);
  return date;
  };

  const selectStyle = {
    control: (provided: any, state: { isDisabled: boolean }) => ({
      ...provided,
      fontSize: '18px',
      padding: '8px 2px 8px 20px',
      border: 'none',
      borderRadius: '20px',
      backgroundColor: '#F1EFEE',
      height: '62.33px',
      textAlign: 'left',
      width: '240px',
      height: '60px',
    }),
    option: (provided: any) => ({
      ...provided,
    }),
  };

  const handleSelectChange = (e) => {
    setSelectedDevice(e.value);
  };

  const changeDateFrom = (e) => {
    setDateFromOpen(!dateFromOpen);
    setDateFrom(e);
    setTextDateFrom(e.toLocaleDateString());
  };

  const clickDateFrom = (e) => {
    e.preventDefault();
    setDateFromOpen(!dateFromOpen);
  };

  const changeDateTo = (e) => {
    setDateToOpen(!dateToOpen);
    setDateTo(e);
    setTextDateTo(e.toLocaleDateString());
  };

  const clickDateTo = (e) => {
    e.preventDefault();
    setDateToOpen(!dateToOpen);
  };

  useEffect(() => {
    const optionData = async () => {
      try {
        const apiListSN = "http://178.128.107.238:5000/api/device/Data/allDevice"
        const response = await fetch(apiListSN, {
          method: "GET",
          headers: {
            'COntent-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        const deviceData = jsonData.data.response;
        const formattedOptions = deviceData.map((item) => ({
          value: item.serial_number,
          label: item.serial_number,
        }));
        setDevices(formattedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    return () => optionData();
  }, []);

  useEffect(() => {
    const dataLog = async () => {

      if (selectedDevice && dateFrom && dateTo) {
      try {
        const from = dateFrom.toLocaleDateString();
        const to = dateTo.toLocaleDateString();
        const apiLog = `http://178.128.107.238:5000/api/log/Log/${selectedDevice}?from=${from}&to=${to}`
        console.log(apiLog);
        const response = await fetch(apiLog, {
          method: "GET",
          headers: { 'COntent-Type': 'application/json' },
        });

        const jsonData = await response.json();
        console.log(jsonData);
        const data = jsonData.data.response;
        const sortedData = [...data].sort((a, b) => a.updatedAt - b.updatedAt);
        const yValues = sortedData.map(item => addHours(new Date(item.updatedAt)));
        setYData(yValues);
        //const hasValue2 = sortedData.some(item => item.value2 !== null);
        const hasValue2 = sortedData.some(item => item.value2 !== null && item.value2 !== undefined);
        console.log(hasValue2);
        setFlagValue(hasValue2);
        console.log(flagValue)
          if (hasValue2) {
              //setFlagValue(true);
              const xValues = sortedData.map(item => parseFloat(item.value));;
              const xValues2 = sortedData.map(item => parseFloat(item.value2 || 0));;
              setXData(xValues);
              setXData2(xValues2);
          } else {
              //setFlagValue(false);
              const xValues = sortedData.map(item => parseFloat(item.value));;
              setXData(xValues);
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
     }
    };

    dataLog();
  }, [selectedDevice, dateFrom, dateTo]);

  const downloadLog = () => {
  if (selectedDevice && dateFrom && dateTo) {
    try {
      const from = dateFrom.toLocaleDateString();
      const to = dateTo.toLocaleDateString();
      const apiDownloadLog = `http://178.128.107.238:5000/api/log/Log/download/${selectedDevice}?from=${from}&to=${to}`
      console.log(apiDownloadLog);
      const link = document.createElement('a');
      link.href = apiDownloadLog;
      link.setAttribute('download', ''); // Empty attribute for preformatted filename and format
      link.style.display = 'none';
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
   }
  };

    return (
        <div className='page-container'>
            <div className='border-container'>
                <div className='content-container'>
                    <div className='page-header'>
                        <div className='page-tittle'>
                            <h1>Logging</h1>
                        </div>
                    </div>
                      <div className='page-header log'>
                        <div className='page-control'>
                            <Select
                              styles={selectStyle}
                              placeholder="Serial Number..."
                              value={selectedDevice !== '' ? { value: selectedDevice, label: selectedDevice } : null}
                              onChange={handleSelectChange}
                              options={devices}
                              />
                          <div className="button-wrapper">
                              <button className='log-button' onClick={clickDateFrom}>
                              {textDateFrom}
                              </button>
                              {dateFromOpen && (
                                <div className="datepicker-wrapper">
                                <DatePicker selected={dateFrom} onChange={changeDateFrom} inline />
                              </div>
                              )}
                          </div>
                          <div className="button-wrapper">
                              <button className='log-button' onClick={clickDateTo}>
                              {textDateTo}
                              </button>
                              {dateToOpen && (
                              <div className="datepicker-wrapper">
                                <DatePicker selected={dateTo} onChange={changeDateTo} inline />
                              </div>
                              )}
                          </div>
                          <button className='log-download' onClick={downloadLog}>
                            Download
                          </button>
                     </div>
                    </div>
                    <div className='chart'>
                       {flagValue ? (
                        <LineChart
                          height={540}
                          slotProps= {{
                                       legend: {
                                         position: { vertical: 'top', horizontal: 'left' },
                                         padding: { top: 515, left: 50 },
                                         itemMarkWidth: 50,
                                         itemMarkHeight: 3,
                                        },
                                     }}
                          series = {[
                            { showMark: false, curve: 'natural', data: xData, label: 'Temperature' },
                            { showMark: false, curve: 'natural', data: xData2, label: 'Humidity' }
                                   ]}
                          xAxis = {[{ scaleType: 'time' ,data: yData }]}
                        />
                        ) : (
                        <LineChart
                          height={540}
                          slotProps= {{
                                       legend: {
                                         position: { vertical: 'top', horizontal: 'left' },
                                         padding: { top: 515, left: 50 },
                                         itemMarkWidth: 50,
                                         itemMarkHeight: 3,
                                        },
                                     }}
                          series = {[ { showMark: false, curve: 'natural', data: xData, label: 'Pressure' } ]}
                          xAxis = {[{ scaleType: 'time', data: yData }]}
                        />
                         )}
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Logging;
