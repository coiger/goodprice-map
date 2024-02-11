import { FloatButton } from 'antd';
import { GithubOutlined, HomeOutlined, LinkOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import Map from 'components/Map';
import Search from 'components/Search';
import CategoryFilter from 'components/CategoryFilter';
import { gotoUserLocation } from 'utils';
import placesData from 'db/places.json';
import styles from './App.module.css';

function App() {
  const places = placesData
    .filter(({ category, latitude, longitude }) => category && latitude && longitude)
    .map(place => ({
      ...place,
      price: +place.price,
      latitude: +place.latitude,
      longitude: +place.longitude,
      contact: `${place.contact}`,
    }));

  const categoryList = Array.from(new Set(places.map(({ category }) => category)));
  const [categoryFilter, setCategoryFilter] = useState<string[]>(categoryList);

  const [position, setPosition] = useState<LatLngExpression>([37.5537586, 126.9809696]); // 서울의 중심 남산

  useEffect(() => {
    gotoUserLocation(setPosition)();
  }, []);

  return (
    <div>
      <Map center={position} places={places} categoryFilter={categoryFilter} />
      <div className={`${styles.search} ${styles.box}`}>
        <Search setPosition={setPosition} />
      </div>
      <div className={`${styles.filter} ${styles.box}`}>
        <CategoryFilter
          categoryList={categoryList}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </div>
      <FloatButton.Group
        className={styles['btn-grp']}
        trigger='click'
        type='primary'
        style={{ right: 24 }}
        icon={<LinkOutlined />}>
        <a
          href='https://github.com/coiger/goodprice.map'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Open github repository'>
          <FloatButton icon={<GithubOutlined />} />
        </a>
        <a
          href='https://www.goodprice.go.kr/index.jsp'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Open goodprice homepage'>
          <FloatButton icon={<HomeOutlined />} />
        </a>
      </FloatButton.Group>
    </div>
  );
}

export default App;
