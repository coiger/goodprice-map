import { LatLngExpression } from 'leaflet';

export const gotoUserLocation = (setPosition: (position: LatLngExpression) => void) => () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(userPosition => {
      setPosition([userPosition.coords.latitude, userPosition.coords.longitude]);
    });
  }
};
