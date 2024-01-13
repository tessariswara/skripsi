import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "../../styles/device.css";
import { fetchData, cachedData } from '../device/deviceApi/hitApi';

const DashboardModal = ({isOpen, onRequestClose, onSelectedValues}) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState<string[]>([]);

  const selectStyle = {
    control: (provided, state) => ({
      ...provided,
      fontSize: '16px',
      padding: '0 0 0 15px',
      border: 0,
      borderRadius: '10px',
      backgroundColor: state.isDisabled ? 'lightgray' : 'white',
      height: '62.33px',
    }),
    option: (provided) => ({
      ...provided,
    }),
  };

  const main = async () => {
    try {
      await fetchData();
      const mappedData = cachedData.map((item: any) => ({
        value: item.serial_number,
        label: item.serial_number,
      }));
      setOptions(mappedData);
    } catch (error) {
      console.error('Gagal menerima informasi : ', error);
    }
  };

  useEffect(() => {
    return () => main();
  }, []);

  const submit = async () => {
    const selectedValues = selectedOption.map(option => option.value).join(',');
    await onSelectedValues(selectedValues);
    onRequestClose();
    console.log("ini selected", selectedValues);
  };

  return isOpen ? (
    <div className="modal-content">
      <div className="modal-content">
        <h1 className='modal-header'>Add Device Widget</h1>
        <Select
          styles={selectStyle}
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
          isMulti
        />
        <div className='modal-cta'>
          <button className="button cancel" onClick={onRequestClose}>Cancel</button>
          <button className="button" onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DashboardModal;
