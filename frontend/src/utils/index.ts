import { message } from 'antd';
import { LatLngExpression } from 'leaflet';

export const gotoUserLocation = (setPosition: (position: LatLngExpression) => void) => () => {
  if ('geolocation' in navigator && navigator.geolocation.getCurrentPosition) {
    navigator.geolocation.getCurrentPosition(
      userPosition => {
        setPosition([userPosition.coords.latitude, userPosition.coords.longitude]);
      },
      () => message.warning('현 위치를 찾을 수 없습니다.', 1.5),
    );
  }
};
