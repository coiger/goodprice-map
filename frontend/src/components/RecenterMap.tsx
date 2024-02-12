import { LatLngExpression } from 'leaflet';
import { memo, useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RecenterMapProps {
  center: LatLngExpression;
  zoom: number;
}

function RecenterMap({ center, zoom }: RecenterMapProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);

  return null;
}

export default memo(RecenterMap);
