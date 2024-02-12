import { Button, FloatButton } from 'antd';
import { DownCircleOutlined, GithubOutlined, HomeOutlined, LinkOutlined, UpCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import Map from 'components/Map';
import Search from 'components/Search';
import CategoryFilter from 'components/CategoryFilter';
import { gotoUserLocation } from 'utils';
import placesData from 'db/places.json';
import Place from 'types/Place';
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
  const [categoryFilter, setCategoryFilter] = useState<string[]>(categoryList);

  const [position, setPosition] = useState<LatLngExpression>([37.5537586, 126.9809696]); // 서울의 중심 남산

  useEffect(() => {
    gotoUserLocation(setPosition)();
  }, []);

  const [showFullCategoryList, setShowFullCategoryList] = useState<boolean>(true);

  return (
    <div>
      <Map center={position} setCenter={setPosition} places={places} categoryFilter={categoryFilter} />
      <div className={`${styles.search} ${styles.box}`}>
        <Search setPosition={setPosition} />
      </div>
      <div className={`${styles.filter} ${styles.box} ${showFullCategoryList ? '' : styles.hidden}`}>
        <div className={styles['filter-inner']}>
          <CategoryFilter
            categoryList={categoryList}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <Button
            className={styles['category-show-btn']}
            type='text'
            icon={showFullCategoryList ? <DownCircleOutlined /> : <UpCircleOutlined />}
            onClick={() => setShowFullCategoryList(v => !v)}
          />
        </div>
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
