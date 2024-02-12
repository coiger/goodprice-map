import { memo, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { LatLngBounds, LatLngExpression } from 'leaflet';
import Place from 'types/Place';
import styles from './Map.module.css';

interface MapProps {
  center: LatLngExpression;
  setCenter: (center: LatLngExpression) => void;
  places: Place[];
  categoryFilter: string[];
}

function Map({ center, setCenter, places, categoryFilter }: MapProps) {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);

  function RecenterAutomatically({ center }: { center: LatLngExpression }) {
    const map = useMap();

    useEffect(() => {
      map.setView(center);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center]);

    return null;
  }

  function SetViewOnClick() {
    const map = useMapEvent('click', e => {
      map.setView(e.latlng);
    });

    return null;
  }

  function SetBounds() {
    const mapforload = useMapEvent('load', () => {
      setBounds(mapforload.getBounds());
    });

    const mapforzoom = useMapEvent('zoomend', () => {
      setBounds(mapforzoom.getBounds());
    });

    const mapformove = useMapEvent('moveend', () => {
      setBounds(mapformove.getBounds());
    });

    return null;
  }

  return (
    <MapContainer center={center} zoom={16} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {places
        .filter(
          ({ category, latitude, longitude }) =>
            categoryFilter.includes(category) && bounds?.contains([latitude, longitude]),
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
      <SetViewOnClick />
      <SetBounds />
    </MapContainer>
  );
}

export default memo(Map);
