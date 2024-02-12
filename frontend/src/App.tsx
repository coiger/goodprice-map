import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';

import { Button, Drawer } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

import Map from 'components/Map';
import Search from 'components/Search';
import CategoryFilter from 'components/CategoryFilter';
import MyLocationButton from 'components/button/MyLocationButton';

import Place from 'types/Place';
import { gotoUserLocation } from 'utils';
import placesData from 'db/places.json';

import MyGithubBtn from 'components/button/MyGithubBtn';
import styles from './App.module.css';

function App() {
  const places: Place[] = placesData
    .filter(({ category, latitude, longitude }) => category && latitude && longitude)
    .map(place => ({
      ...place,
      price: +place.price,
      latitude: +place.latitude,
      longitude: +place.longitude,
      contact: `${place.contact}`,
    }));

  const categoryList = Array.from(new Set(places.map(({ category }) => category)));
  const [categoryFilter, setCategoryFilter] = useState<string[]>(
    categoryList.filter(
      c => c !== '기타서비스업' && c !== '목욕업' && c !== '세탁업' && c !== '숙박업' && c !== '이미용업',
    ),
  );

  const [position, setPosition] = useState<LatLngExpression>([37.5537586, 126.9809696]); // 서울의 중심 남산

  useEffect(() => {
    gotoUserLocation(setPosition)();
  }, []);

  const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false);

  return (
    <div>
      <Map center={position} setCenter={setPosition} places={places} categoryFilter={categoryFilter} />
      <div className={styles.search}>
        <div className={styles.box}>
          <Search setPosition={setPosition} />
        </div>
        <Button
          className={styles['category-filter-btn']}
          icon={<EnvironmentOutlined />}
          shape='circle'
          type='primary'
          onClick={() => setShowCategoryFilter(true)}
        />
      </div>
      <MyLocationButton setPosition={setPosition} />
      <Drawer
        rootClassName={styles.drawer}
        title='업종을 선택해주세요'
        placement='right'
        onClose={() => setShowCategoryFilter(false)}
        open={showCategoryFilter}
        width='100%'>
        <CategoryFilter
          categoryList={categoryList}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </Drawer>

      <MyGithubBtn />
    </div>
  );
}

export default App;
