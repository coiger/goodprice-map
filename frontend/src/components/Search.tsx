import { AimOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { LatLngExpression } from 'leaflet';
import { memo } from 'react';
import { gotoUserLocation } from 'utils';

interface SearchProps {
  setPosition: (position: LatLngExpression) => void;
}

function Search({ setPosition }: SearchProps) {
  const searchPosition = (value: string) => {
    // value로 카카오맵 검색해서
    // setPosition
    console.log(value);
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
