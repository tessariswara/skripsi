import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchDataFromApi, fetchDataFromTenant } from "./tenantApi/tenantHitApi";

interface TenantTableProps {
  tenantUrl: string;
}

const TenantTable: React.FC<TenantTableProps> = ({ tenantUrl }) => {
  const [tenantData, setTenantData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenantData = await fetchDataFromTenant(tenantUrl);
        const filteredData = tenantData.map((item) => ({
          id: item.plant_name,
          lastName: item.alamat,
          firstName: item.deskripsi,
        }));

        console.log(tenantData)

        setTenantData(filteredData);
        setError(null);
      } catch (error) {
        console.error("Error setting tenant data:", error.message);
        setError("Error fetching data from API. Please try again.");
      }
    };

    fetchData();
  }, [tenantUrl]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Nama Plant",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Alamat",
      width: 250,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "Deskripsi",
      width: 250,
      editable: true,
    },
  ];

  return (
    <div style={{ display:'flex' }}>
      <DataGrid rows={tenantData} columns={columns} 
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 15, 25]} />
    </div>
  );
};

export default TenantTable;