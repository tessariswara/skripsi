const UpdateDevice = (
  apiPost: string,
  serialNumber: string,
  deviceName: string,
  machineName: string,
  plant: string,
  description: string
) => {
  const deviceData = {
    serial_number: serialNumber,
    nama_device: deviceName,
    mesin: machineName,
    plant: plant,
    deskripsi: description,
  };

  const requestOptions = {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deviceData),
  };

  return fetch(apiPost, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response dari server setelah PUT:", data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default UpdateDevice;
