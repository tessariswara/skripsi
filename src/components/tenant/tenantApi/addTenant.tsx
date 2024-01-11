const AddTenant = (
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

    console.log("ini tenant", tenanData)
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([tenanData]),
    };
  
    return fetch(tenantPost, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response dari server setelah POST:", data.message);
        console.log(tenanData)
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(tenanData)
      });
  };
  
  export default AddTenant;
  