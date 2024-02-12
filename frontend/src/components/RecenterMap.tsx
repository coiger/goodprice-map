import { LatLngExpression } from 'leaflet';
import { memo, useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RecenterMapProps {
  center: LatLngExpression;
  defaultZoom: number;
}

function RecenterMap({ center, defaultZoom }: RecenterMapProps) {
  const map = useMap();

  useEffect(() => {
    const originalZoom = map.getZoom();
    map.setView(center, Math.max(originalZoom, defaultZoom));
  }, [center, map, defaultZoom]);

  return null;
}

export default memo(RecenterMap);
