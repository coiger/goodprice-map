import { LatLngBounds } from 'leaflet';
import { memo } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

interface SetMapBoundsProps {
  setMapBounds: (mapBounds: LatLngBounds) => void;
}

function SetMapBounds({ setMapBounds }: SetMapBoundsProps) {
  const map = useMap();
  setMapBounds(map.getBounds());

  useMapEvents({
    zoomend: e => {
      setMapBounds(e.target.getBounds());
    },
    moveend: e => {
      setMapBounds(e.target.getBounds());
    },
  });

  return null;
}

export default memo(SetMapBounds);
