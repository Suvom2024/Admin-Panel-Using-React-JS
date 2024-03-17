import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Define custom styles
const overrideStyles = `
.leaflet-div-icon {
  background: transparent;
  border: none;
}
.leaflet-routing-container {
  display: none !important;
}

.pulsating-circle::after {
  content: '';
  position: absolute;
  width: 240%;
  height: 240%;
  border-radius: 50%;
  top: 5px; /* Center the effect on the dot */
  left: 7px; /* Center the effect on the dot */
  background-color: rgba(135, 206, 235, 0.6); /* Converted #87CEEB to rgba */
  animation: pulsate 1.2s ease-out infinite;
  transform: scale(0.5);
  transform-origin: center center;
}
@keyframes pulsate {
  0% {
    transform: scale(0.5);
    opacity: 1.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
`;
// Define the pulsating icon for the start point
const pulsatingIcon = L.divIcon({
  html: `
    <div class="pulsating-circle">
    <img src="https://www.thelaundrybasket.in/assets/images/professional.png" alt="Pulsating Circle" style="width: 60px; height:60px;" />
    </div>
  `,
  className: 'leaflet-div-icon',
  iconSize: [20, 20], // Adjusted icon size
});

// Define the endpoint icon
const endPointIcon = L.icon({
  iconUrl: 'https://img.icons8.com/color/48/small-business.png', // New icon URL
  iconSize: [48, 48], // Adjust the size as needed
  iconAnchor: [24, 48], // Adjust the anchor point
  popupAnchor: [0, -48] // Adjust the popup anchor point
});

const bikeIcon = L.icon({
  iconUrl: 'https://www.thelaundrybasket.in/assets/images/Laundry_basket_01-min.gif', // URL of the bike icon
  iconSize: [60, 60], // Adjust the size as needed
  iconAnchor: [20, 40], // Adjust the anchor point
  popupAnchor: [0, -40] // Adjust the popup anchor point
});

// Custom hook for routing
function Routing({ start, end }) {
  const map = useMap();
  const animMarkerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    const clearPreviousRoute = () => {
      if (routePolylineRef.current) {
        routePolylineRef.current.remove();
        routePolylineRef.current = null;
      }
      if (animMarkerRef.current) {
        animMarkerRef.current.remove();
        animMarkerRef.current = null;
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
    function animateMarker(map, route, animMarkerRef, timeoutIdRef) {
      // Ensure the endpoint icon is added to the map at the destination from the start
      // This makes the endpoint icon visible throughout the animation
      L.marker([end.lat, end.lng], {icon: endPointIcon}).addTo(map);
    
      if (animMarkerRef.current) {
        animMarkerRef.current.remove(); // Remove any existing animating marker before starting a new animation
      }
    
      // Initialize the animating marker (bike) at the start of the route
      animMarkerRef.current = L.marker(route[0], { icon: bikeIcon }).addTo(map);
      let i = route.length - 1; // Start from the end of the route
    
      function move() {
        if (i < route.length && animMarkerRef.current) {
          // Update the position of the bike icon along the route
          animMarkerRef.current.setLatLng(route[i]);
          i--;
          timeoutIdRef.current = setTimeout(move, 5000); // Adjust for desired animation speed
        } else {
          // Once the bike reaches the destination, remove the bike icon from the map
          if (animMarkerRef.current) {
            animMarkerRef.current.remove();
            animMarkerRef.current = null;
          }
        }
      }
    
      move();
    }
    const fetchRouteAndAnimate = async () => {
      clearPreviousRoute(); // Clear previous route and marker before fetching new one

      try {
        const response = await fetch('http://localhost:5000/route', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            start_lat: start.lat,
            start_long: start.lng,
            end_lat: end.lat,
            end_long: end.lng,
          }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const routeData = await response.json();
        const routeLatLngs = routeData.route.map(point => L.latLng(point.lat, point.lng));

        if (routeLatLngs.length > 0) {
          // Add the new route to the map
          routePolylineRef.current = L.polyline(routeLatLngs, { color: '#48bb78', opacity: 1, weight: 5 }).addTo(map);
          map.fitBounds(routePolylineRef.current.getBounds());
          
          // Add pulsating icon for the start point
          L.marker([start.lat, start.lng], {icon: pulsatingIcon}).addTo(map);
          
          // Animate marker along the route
          animateMarker(map, routeLatLngs, animMarkerRef, timeoutIdRef);
        }
      } catch (error) {
        console.error('Failed to fetch route:', error);
      }
    };

    fetchRouteAndAnimate();

    // Cleanup function to clear the route and marker when the component unmounts or dependencies change
    return () => {
      clearPreviousRoute();
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      if (animMarkerRef.current) {
        animMarkerRef.current.remove();
      }
    };
  }, [map, start.lat, start.lng, end.lat, end.lng]); // Ensure dependencies are correctly listed

  return null;
}

export default function MapView({ start, end }) {
  const mapTilerKey = 'YT4ymgZAf95Rl7FCfVLN';
  const mapStyle = 'streets';
  const mapTilerUrl = `https://api.maptiler.com/maps/${mapStyle}/256/{z}/{x}/{y}.png?key=${mapTilerKey}`;

  return (
    <>
      <style>{overrideStyles}</style>
      <MapContainer
        center={[start.lat, start.lng]} // Center the map on the start position
        zoomControl={false}
        attributionControl={false}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url={mapTilerUrl}
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
        />
        <Routing start={start} end={end} />
      </MapContainer>
    </>
  );
}
