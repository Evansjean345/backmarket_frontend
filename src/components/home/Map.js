import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = ({ onLocationSelect }) => {
  const defaultPosition = { lat: 5.347, lng: -4.0276 };
  const [position, setPosition] = useState(defaultPosition);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const mapRef = useRef(null);
  const provider = new OpenStreetMapProvider();

  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    // Envoi des données de localisation au parent à chaque changement de position
    if (position) {
      onLocationSelect(position);
    }
  }, [position, onLocationSelect]);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const newPosition = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
            accuracy: location.coords.accuracy
          };
          setPosition(newPosition);
          if (mapRef.current) {
            mapRef.current.setView([newPosition.lat, newPosition.lng], 13);
          }
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          // Utiliser la position par défaut en cas d'erreur
          setPosition(defaultPosition);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  };

  const handleSearch = async (searchText) => {
    try {
      const results = await provider.search({ query: searchText });
      if (results.length > 0) {
        const newPosition = {
          lat: results[0].y,
          lng: results[0].x,
          label: results[0].label
        };
        setPosition(newPosition);
        if (mapRef.current) {
          mapRef.current.setView([newPosition.lat, newPosition.lng], 13);
        }
      }
      setSuggestions([]);
      setSearchText('');
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  const handleInputChange = async (value) => {
    setSearchText(value);
    if (value.length > 2) {
      const results = await provider.search({ query: value });
      setSuggestions(results.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="map-container">
      <div className="search-controls">
        <div className="flex justify-center search-wrapper">
          <input
            type="text"
            value={searchText}
            placeholder="Rechercher un lieu..."
            onChange={(e) => handleInputChange(e.target.value)}
            className="search-input"
          />
          {suggestions.length > 0 && (
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSearch(suggestion.label)}
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
      <button onClick={handleGetLocation} className="location-button">
          utiliser ma position
      </button>

      <MapContainer
        center={position}
        zoom={13}
        ref={mapRef}
        className='map'
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon} />
      </MapContainer>
    </div>
  );
};

export default Map;
