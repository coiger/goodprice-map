/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet';
import { LatLngBounds, LatLngExpression } from 'leaflet';
import Place from 'types/Place';
import styles from './Map.module.css';

const DEFAULT_ZOOM_LEVEL = 16;

interface MapProps {
  center: LatLngExpression;
  setCenter: (center: LatLngExpression) => void;
  places: Place[];
  categoryFilter: string[];
}

function Map({ center, setCenter, places, categoryFilter }: MapProps) {
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);

  function RecenterAutomatically({ center }: { center: LatLngExpression }) {
    const map = useMap();

    useEffect(() => {
      map.setView(center, DEFAULT_ZOOM_LEVEL);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center]);

    return null;
  }

  function SetBounds() {
    const map = useMapEvents({
      load: () => {
        setMapBounds(map.getBounds());
      },
      zoomend: () => {
        setMapBounds(map.getBounds());
      },
      moveend: () => {
        setMapBounds(map.getBounds());
      },
    });

    return null;
  }

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
      <RecenterAutomatically center={center} />
      <SetBounds />
    </MapContainer>
  );
}

export default memo(Map);
