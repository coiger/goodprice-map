import { LatLngBounds } from 'leaflet';
import { memo } from 'react';
import { useMapEvents } from 'react-leaflet';

interface SetMapBoundsProps {
  setMapBounds: (mapBounds: LatLngBounds) => void;
}

function SetMapBounds({ setMapBounds }: SetMapBoundsProps) {
  useMapEvents({
    load: e => {
      setMapBounds(e.target.getBounds());
    },
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
