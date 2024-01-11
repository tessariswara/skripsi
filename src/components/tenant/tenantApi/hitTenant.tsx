const tenantUrl = "http://178.128.107.238:5000/api/tenant/allPlant";

export let tenantData: any;

export const fetchTenant = async (): Promise<any> => {
  if (tenantData) {
    return tenantData;
  }


  try {
    const response = await fetch(tenantUrl, {
      headers: {
        method: "GET",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    tenantData = data.data.response;
    return tenantData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};