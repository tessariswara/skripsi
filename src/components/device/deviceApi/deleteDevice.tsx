export const deleteDeviceApi = async (apiDelete: string, plant: string, serialNumbers: string[]) => {
    const queryParam = `sn=${serialNumbers.join(',')}`;
    console.log("ini loh", queryParam)
    const url = `${apiDelete}/device/plantA?${queryParam}`;
  
    try {
      const response = await fetch(url, { method: 'DELETE' });
  
      if (!response.ok) {
        throw new Error(`Error deleting device: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error deleting device: ${error.message}`);
    }
  };