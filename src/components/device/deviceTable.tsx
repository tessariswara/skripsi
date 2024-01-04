import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchDataFromApi } from "./deviceApi/deviceHitApi";

interface DeviceTableProps {
  apiUrl: string;
  searchText: string;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ apiUrl, searchText }) => {
  const [deviceData, setDeviceData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetchDataFromApi(apiUrl);
        const mappedData = apiData.map((item) => ({
          id: item.serial_number,
          lastName: item.nama_device,
          firstName: item.mesin,
          age: item.plant,
          desc: item.deskripsi,
        }));

        setDeviceData(mappedData);
        setError(null);
      } catch (error) {
        console.error("Error setting device data:", error.message);
        setError("Gagal menerima informasi, periksa kembali server Anda.");
        setDeviceData([]);
      }
    };

    fetchData();
  }, [apiUrl]);

  const filteredData = deviceData.filter((row) =>
    Object.values(row).some(
      (value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Serial Number",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Device Name",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "Machine Name",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Plant",
      flex: 0.7,
    },
    {
      field: "desc",
      headerName: "Deskripsi",
      flex: 1,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1', justifyContent: "center", width: '100%'}}>
      {error ? (
        <div style={{display: 'flex', justifyContent: "center"}}>
          <p>{error}</p>
        </div>
      ) : (
        filteredData.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1  }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 15 } },
              }}
              pageSizeOptions={[15, 25, 30, 35]}
              hideFooterSelectedRowCount
            />
          </div>
        ) : (
          <div style={{display: 'flex', justifyContent: "center"}}>
            <p>Data tidak ditemukan</p>
          </div>
        )
      )}
    </div>
  );
};

export default DeviceTable;
