import Map from 'components/Map';
import styles from './App.module.css';

function App() {
  return (
    <div>
      <div className={styles.filter} />
      <Map
        places={[
          {
            id: 1,
            category: '일식',
            name: '동명',
            menu: '등심카츠',
            price: 6900,
            contact: '02-6339-3331',
            address: '서울특별시 구로구 경인로47길 6',
            latitude: 37.5000160158822,
            longitude: 126.86732495519,
          },
        ]}
      />
    </div>
  );
}

export default App;
