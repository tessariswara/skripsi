import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchDataFromApi } from "./deviceApi/deviceHitApi";

interface DeviceTableProps {
  apiUrl: string;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ apiUrl }) => {
  const [deviceData, setDeviceData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetchDataFromApi(apiUrl);
        const filteredData = apiData.map((item) => ({
          id: item.serial_number,
          lastName: item.nama_device,
          firstName: item.mesin,
          age: item.plant,
          desc: item.deskripsi,
        }));

        setDeviceData(filteredData);
        setError(null);
      } catch (error) {
        console.error("Error setting device data:", error.message);
        setError("Error fetching data from API. Please try again.");
      }
    };

    fetchData();
  }, [apiUrl]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Serial Number",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Device Name",
      width: 250,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "Machine Name",
      width: 250,
      editable: true,
    },
    {
      field: "age",
      headerName: "Plant",
      width: 250,
      editable: true,
    },
    {
      field: "desc",
      headerName: "Deskripsi",
      width: 250,
      editable: true,
    },
  ];

  return (
    <div style={{ display:'flex' }}>
      <DataGrid rows={deviceData} columns={columns} 
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 15, 25]} />
    </div>
  );
};

export default DeviceTable;