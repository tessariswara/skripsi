export let dataDash : any;

export const allData = async (listDevice): Promise<any> => {
  if (dataDash) {
    return dataDash;
  }

  try {
    const apiShowValue = `http://178.128.107.238:5000/api/home/Data?sn=${listDevice}`
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
            flag: "humudity",
            value: item.value2,
            value2: undefined,
          },
          {
            ...item,
            flag: "temperature",
            value2: undefined,
          }
        ];
      } else if (item.value === null ) {
         return [
          {
            ...item,
            flag: undefined,
            value: 0,
            value2: undefined,
            updateAt: 0,
          }
        ];
      } else {
         return [
          {
            ...item,
            flag: "pressure",
            value2: undefined,
          }
        ];
      }
    });
    console.log("ini data", dataDash);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
