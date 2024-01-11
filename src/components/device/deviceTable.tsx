import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchData, cachedData } from "./deviceApi/hitApi";
import { fetchTenant, tenantData } from "../tenant/tenantApi/hitTenant";
import DeviceModal from "./deviceModal/deviceModal";


interface DeviceTableProps {
  apiUrl: string;
  searchText: string;
}
export interface MappedDataItem {
  id: string;
  namDev: string;
  namMac: string;
  namPla: string;
  namDesc: string;
}

export interface TenDataItem {
  namaplant: string;
  alamatplant: string;
  deskripsiplant: string;
}

export let mappedData: MappedDataItem[] | undefined;
export let tenData: TenDataItem[] | undefined;

const DeviceTable: React.FC<DeviceTableProps> = ({searchText }) => {
  const [deviceData, setDeviceData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const main = async () => {
    try {
      await fetchData();
      mappedData = cachedData.map((item: any) => ({
        id: item.serial_number,
        namDev: item.nama_device,
        namMac: item.mesin,
        namPla: item.plant,
        namDesc: item.deskripsi,
      }));
      setDeviceData(mappedData);
    } catch (error) {
      console.error('Gagal menerima informasi : ', error);
    }
  };

  useEffect(() => {
    return () => main();
  }, []);

  const mains = async () => {
    try {
      await fetchTenant();
      tenData = tenantData.map((item: any) => ({
          namaplant: item.plant_name,
          alamatplant: item.alamat,
          deskripsiplant: item.deskripsi,
      }));
    } catch (error) {
      console.error('Gagal menerima informasi : ', error);
    }
  };

    
  useEffect(() => {
    return () => mains();
  }, []);

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
      field: "namDev",
      headerName: "Device Name",
      flex: 1,
    },
    {
      field: "namMac",
      headerName: "Machine Name",
      flex: 1,
    },
    {
      field: "namPla",
      headerName: "Plant",
      flex: 0.7,
    },
    {
      field: "namDesc",
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
        <DeviceModal
          mappedData={mappedData} 
          tenData={tenData}
        />
    </div>
    
  );
};

export default DeviceTable;
