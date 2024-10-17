import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEndereco } from '../hooks/useEnderecos'; // Supondo que seu hook esteja em um arquivo separado

// Função para buscar coordenadas via Nominatim
const fetchCoordinates = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1`
  );

  if (response.data.length > 0) {
    const location = response.data[0];
    return {
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
    };
  } else {
    console.error('Endereço não encontrado');
    return null;
  }
};

const MyMap = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { enderecos, loadEnderecos } = useEndereco(); // Usando o hook customizado

  // Função para carregar endereços do AsyncStorage e converter em coordenadas
  const loadAddressesFromStorage = async () => {
    try {
      await loadEnderecos(); // Carrega os endereços do AsyncStorage

      const markerPromises = enderecos.map(async (address) => {
        const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}`;
        const coords = await fetchCoordinates(fullAddress);
        return coords ? { ...coords, title: fullAddress } : null;
      });

      const resolvedMarkers = await Promise.all(markerPromises);
      setMarkers(resolvedMarkers.filter((marker) => marker !== null)); // Remove coordenadas não encontradas
    } catch (error) {
      console.error('Erro ao carregar endereços do AsyncStorage', error);
    }
  };

  useEffect(() => {
    (async () => {
      // Solicita permissão de localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização foi negada.');
        return;
      }

      // Obtém a localização atual
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Carrega endereços do AsyncStorage e coloca marcadores no mapa
      await loadAddressesFromStorage();
    })();
  }, [enderecos]); // Adiciona dependência para carregar endereços quando o hook atualiza

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="Minha Localização" />
          {/* Exibe os marcadores no mapa */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
            />
          ))}
        </MapView>
      ) : (
        <Text>{errorMsg ? errorMsg : 'Carregando localização...'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MyMap;
