const UpdateTenant = (
    tenantPost: string,
    plantName: string,
    address: string,
    description: string,
  ) => {
    const tenanData = {
        plant_name: plantName,
        alamat: address,
        deskripsi: description,
    };
  
    const requestOptions = {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tenanData),
    };
  
    return fetch(tenantPost, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response dari server setelah PUT:", data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  export default UpdateTenant;
  