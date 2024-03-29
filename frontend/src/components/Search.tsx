import { memo } from 'react';
import { Input, message } from 'antd';
import { LatLngExpression } from 'leaflet';

import styles from './Search.module.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const { kakao } = window;
const ps = new kakao.maps.services.Places();

interface SearchProps {
  setPosition: (position: LatLngExpression) => void;
}

function Search({ setPosition }: SearchProps) {
  const searchPosition = (value: string) => {
    ps.keywordSearch(value, (data: { x: number; y: number }[], status: unknown) => {
      if (status === kakao.maps.services.Status.OK && data[0].y && data[0].x) {
        setPosition([data[0].y, data[0].x]);
      } else {
        message.warning('검색된 장소가 없습니다.', 1);
      }
    });
  };

  return (
    <Input.Search
      className={styles.search}
      placeholder='검색한 위치로 지도가 이동합니다'
      allowClear
      onSearch={searchPosition}
    />
  );
}

export default memo(Search);
