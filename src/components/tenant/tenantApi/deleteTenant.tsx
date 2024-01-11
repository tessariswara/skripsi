export const deleteTenantApi = async (tenantDelete: string, address: string, plantName: string[]) => {
    const queryParam = `plant=${plantName.join(',')}`;
    console.log("ini loh", queryParam)
    const url = `${tenantDelete}/tenant?${queryParam}`;
  
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