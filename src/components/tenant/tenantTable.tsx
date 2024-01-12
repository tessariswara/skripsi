import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchTenant, tenantData } from "./tenantApi/hitTenant";
import DeviceModal from "../device/deviceModal/deviceModal";
import TenantModal from "./tenantModal/tenantModal";

interface TenantTableProps {
  tenantUrl: string;
  searchText: string;
}

export interface TenDataItem {
  id: string;
  lastName: string;
  firstName: string;
}

export let tenData: TenDataItem[] | undefined;

const TenantTable: React.FC<TenantTableProps> = ({searchText }) => {
  const [deviceData, setDeviceData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const mains = async () => {
    try {
      await fetchTenant();
      tenData = tenantData.map((item: any) => ({
          id: item.plant_name,
          lastName: item.alamat,
          firstName: item.deskripsi,
      }));
      setDeviceData(tenData);
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
    headerName: "Nama Plant",
    flex: 0.4,
  },
  {
    field: "lastName",
    headerName: "Alamat",
    flex: 0.4,
  },
  {
    field: "firstName",
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
        <TenantModal
          tenData={tenData}
        />
        <DeviceModal
          tenData={tenData} 
        />

  </div>
  );
}

export default TenantTable;



// GAK KEPAKE TAPI YA LUMAYAN BUAT BACKUP


// import { fetchDataFromApi, fetchDataFromTenant } from "./tenantApi/tenantHitApi";
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const tenantData = await fetchDataFromTenant(tenantUrl);
  //       const filteredData = tenantData.map((item) => ({
  //         id: item.plant_name,
  //         lastName: item.alamat,
  //         firstName: item.deskripsi,
  //       }));

  //       console.log(tenantData)

  //       setTenantData(filteredData);
  //       setError(null);
  //     } catch (error) {
  //       console.error("Error setting tenant data:", error.message);
  //       setError("Error fetching data from API. Please try again.");
  //     }
  //   };

  //   fetchData();
  // }, [tenantUrl]);


    // const columns: GridColDef[] = [
  //   {
  //     field: "id",
  //     headerName: "Nama Plant",
  //     width: 200,
  //   },
  //   {
  //     field: "lastName",
  //     headerName: "Alamat",
  //     width: 250,
  //     editable: true,
  //   },
  //   {
  //     field: "firstName",
  //     headerName: "Deskripsi",
  //     width: 250,
  //     editable: true,
  //   },
  // ];