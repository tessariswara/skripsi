const apiUrl = "http://178.128.107.238:5000/api/device/plantA/allDevice";

export let cachedData: any;

export const fetchData = async (): Promise<any> => {
  if (cachedData) {
    return cachedData;
  }


  try {
    const response = await fetch(apiUrl, {
      headers: {
        method: "GET",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    cachedData = data.data.response;
    return cachedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};