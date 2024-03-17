import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import leaflet
import 'leaflet/dist/leaflet.css';
import { Paper, Typography } from '@mui/material';
import styles from './LiveMap.module.css';

const LiveMap = () => {
  // Define the custom icon
  const customIcon = new L.divIcon({
    className: 'custom-icon',
    html: `
    <div>
      <img src="https://img.icons8.com/color/48/marker--v1.png" 
           style="width: 25px; height: 25px; position: absolute; left: 50%; top: 50%; 
                  transform: translate(-50%, -100%);" />
      <div class="${styles.pulseCircle_deep}" 
           style="position: absolute; left: 16%; top: 16%; 
                  transform: translate(-50%, -50%); width: 20px; height: 20px;"></div>
      <div class="${styles.pulseCircle_faint}" 
           style="position: absolute; left: 16%; top: 16%; 
                  transform: translate(-50%, -50%); width: 20px; height: 20px;"></div>
    </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [1, -34],
});


  // Define the coordinates for your two locations
  const location1 = [6.5244, 3.3792]; // Replace with actual coordinates
  const location2 = [6.5244, 3.3748]; // Replace with actual coordinates

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
      <Typography variant="overline" fontWeight="bold" gutterBottom>
        User Concentration
      </Typography>
      <div style={{ height: '300px', width: '100%' }}>
        <MapContainer
          center={[6.5244, 3.3792]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}          
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Add markers */}
          <Marker position={location1} icon={customIcon}>
            <Popup>
              Location 1 Description
            </Popup>
          </Marker>
          <Marker position={location2} icon={customIcon}>
            <Popup>
              Location 2 Description
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </Paper>
  );
};

export default LiveMap;
