export const allData = async (listDevice) => {
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
    const data = jsonData.data.response.flatMap(item => {
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
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
