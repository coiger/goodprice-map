import { AimOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { LatLngExpression } from 'leaflet';
import { memo } from 'react';
import { gotoUserLocation } from 'utils';
import styles from './MyLocationButton.module.css';

interface MyLocationButtonProps {
  setPosition: (position: LatLngExpression) => void;
}

function MyLocationButton({ setPosition }: MyLocationButtonProps) {
  return <Button className={styles.btn} type='text' icon={<AimOutlined />} onClick={gotoUserLocation(setPosition)} />;
}

export default memo(MyLocationButton);
