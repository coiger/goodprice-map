import { AimOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { LatLngExpression } from 'leaflet';
import { memo } from 'react';
import { gotoUserLocation } from 'utils';

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
      }
    });
  };

  return (
    <Input.Search
      placeholder='검색한 위치로 지도가 이동합니다'
      allowClear
      suffix={<AimOutlined className='pointer' onClick={gotoUserLocation(setPosition)} />}
      onSearch={searchPosition}
    />
  );
}

export default memo(Search);