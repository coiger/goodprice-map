import { memo, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import Place from 'types/Place';
import styles from './Map.module.css';

interface MapProps {
  places: Place[];
  categoryFilter: string[];
}

function Map({ places, categoryFilter }: MapProps) {
  const [center, setCenter] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      setCenter([37.5537586, 126.9809696]); // 서울의 중심 남산
    }
  }, []);

  return (
    center && (
      <MapContainer center={center} zoom={17} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {places
          .filter(({ category }) => categoryFilter.includes(category))
          .map(({ id, category, name, menu, price, contact, address, latitude, longitude }) => (
            <Marker key={id} position={[latitude, longitude]}>
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
      </MapContainer>
    )
  );
}

export default memo(Map);
