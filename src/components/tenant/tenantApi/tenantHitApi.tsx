export const fetchDataFromTenant = async (tenantUrl) => {
    try {
      const response = await fetch(tenantUrl, {
        headers: {
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type. Expected JSON.");
      }
  
      const data = await response.json();
      return data.data.response;
      console.log(data)
    } catch (error) {
      console.error("Error fetching data from API:", error.message);
      throw error;
    }
  };