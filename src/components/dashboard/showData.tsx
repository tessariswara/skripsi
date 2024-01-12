export let dataDash : any;

export const allData = async (listDevice): Promise<any> => {
  if (dataDash) {
    return dataDash;
  }

  try {
    const apiShowValue = `http://178.128.107.238:5000/api/home/plantA?sn=${listDevice}`
    const response = await fetch(apiShowValue, {
      method: "GET",
      headers: {
        'COntent-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const jsonData = await response.json();
    dataDash = jsonData.data.response.flatMap(item => {
      if (item.value2 !== null) {
        return [
          {
            ...item,
            value: item.value2,
            value2: undefined,
          },
          {
            ...item,
            value2: undefined,
          }
        ];
      } else if (item.value === null ) {
         return [
          {
            ...item,
            value: 0,
            value2: undefined,
            updateAt: 0,
          }
        ];
      } else {
         return [
          {
            ...item,
            value2: undefined,
          }
        ];
      }
    });
    const mappedData = dataDash.map((item: any) => ({
      ser: item.serial_number,
      namDev: item.nama_device,
      namMac: item.mesin,
      namVal: item.value,
      namVal2: item.value2,
      namStatus: item.status,
    }));
    console.log("ini data", dataDash);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
