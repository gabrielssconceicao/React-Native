import axios from 'axios';

// Função para buscar coordenadas via Nominatim
export const fetchCoordinates = async (address) => {
    console.log(address)
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1`
    );
    
    if (response.data.length > 0) {
      console.log(response.data);
      const location = response.data[0];
      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };
    } else {
      console.error('Endereço não encontrado');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error);
    return null;
  }
};
