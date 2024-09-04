import 'leaflet/dist/leaflet.css';
import './LeafletMap.css';
import leaflet, { Map } from 'leaflet';
import { useState, useEffect } from 'react';



function LeafletMap() {
  const [position, setPosition] = useState<GeolocationCoordinates>();
  const [map, setMap] = useState<Map>();

  function getPosition() {
    if ('geolocation' in navigator && !position?.latitude) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position.coords);
      });
    }
  }

  useEffect(() => {
    if (!position?.latitude) {
      getPosition();
    }
  }, []);

  useEffect(() => {
    if (position?.latitude && !map) {
      const myMap = leaflet
        .map('map')
        .setView([position?.latitude, position?.longitude], 15);

      setMap(myMap);
    }
  }, [position]);

  useEffect(() => {
    if (map && position) {
      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);
    }
  }, [map]);

//   useEffect(() => {
//     if (map) {
//       async function getNearbyStops() {
//         const response = await fetch(
//           `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${
//             position?.latitude
//           }&originCoordLong=${position?.longitude}&format=json&accessId=${
//             import.meta.env.VITE_API_KEY
//           }`
//         );
//         const { stopLocationOrCoordLocation } = await response.json();

//         stopLocationOrCoordLocation.forEach((stop: any) => {
//           if (map) {
//             const marker = leaflet
//               .marker([stop.StopLocation.lat, stop.StopLocation.lon])
//               .addTo(map);

//             marker.bindPopup(`${stop.StopLocation.name}`);
//           }

//         });
//       }

//       getNearbyStops();
//     }
//   }, [map]);

  return (
    <>
      <section id='map'></section>
    </>
  );
}

export default LeafletMap;