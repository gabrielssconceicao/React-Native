import axios from 'axios';
// Função para buscar coordenadas via Nominatim
export const fetchCoordinates = async (address) => {
  const encodedAddress = encodeURIComponent(`${address.logradouro}, ${address.bairro}, ${address.localidade}, ${address.estado}, ${address.uf}, Brasil`)
  .replace(/%20/g, '+');
  
  //Rua+Harmonia,+Vila+Madalena,+São+Paulo,+SP,+Brasil
  try {
    const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1`
  );
    if(response.data.length > 0) {
      const {lat,lon} = response.data[0];
      console.log(response.data[0])
      return {lat,lon};
    } else {
      return {lat:0,lon:0};   
    }
  } catch (e) {
    console.log(e)
  }
};