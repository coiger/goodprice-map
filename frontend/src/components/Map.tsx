import { memo, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import Place from 'types/Place';
import styles from './Map.module.css';

interface MapProps {
  center: LatLngExpression;
  places: Place[];
  categoryFilter: string[];
}

function Map({ center, places, categoryFilter }: MapProps) {
  function RecenterAutomatically({ center }: { center: LatLngExpression }) {
    const map = useMap();

    useEffect(() => {
      map.setView(center);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center]);

    return null;
  }

  return (
    <MapContainer center={center} zoom={17} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {places
        .filter(({ category }) => categoryFilter.includes(category))
        .map(({ id, category, name, menu, price, contact, address, latitude, longitude }) => (
          <Marker key={id} position={[latitude as number, longitude as number]}>
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
    </MapContainer>
  );
}

export default memo(Map);
