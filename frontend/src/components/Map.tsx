/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngBounds, LatLngExpression } from 'leaflet';
import Place from 'types/Place';
import styles from './Map.module.css';
import RecenterMap from './RecenterMap';
import SetMapBounds from './SetMapBounds';

const DEFAULT_ZOOM_LEVEL = 14;

interface MapProps {
  center: LatLngExpression;
  setCenter: (center: LatLngExpression) => void;
  places: Place[];
  categoryFilter: string[];
}

function Map({ center, setCenter, places, categoryFilter }: MapProps) {
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);

  return (
    <MapContainer center={center} zoom={DEFAULT_ZOOM_LEVEL} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {places
        .filter(
          ({ category, latitude, longitude }) =>
            categoryFilter.includes(category) && mapBounds?.contains([latitude, longitude]),
        )
        .map(({ id, category, name, menu, price, contact, address, latitude, longitude }) => (
          <Marker
            key={id}
            position={[latitude, longitude]}
            eventHandlers={{
              click: () => setCenter([latitude, longitude]),
            }}>
            <Popup>
              <div className='default'>
                <h3 className={styles.title}>{`[${category}] ${name}`}</h3>
                <ul className={styles.list}>
                  <li>{`${menu} ${price}원`}</li>
                  <li>{address}</li>
                  <li>{contact}</li>
                </ul>
              </div>
            </Popup>
          </Marker>
        ))}
      <RecenterMap center={center} defaultZoom={DEFAULT_ZOOM_LEVEL} />
      <SetMapBounds setMapBounds={setMapBounds} />
    </MapContainer>
  );
}

export default memo(Map);
