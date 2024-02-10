import Map from 'components/Map';
import { FloatButton } from 'antd';
import { GithubOutlined, HomeOutlined, LinkOutlined } from '@ant-design/icons';
import styles from './App.module.css';

function App() {
  return (
    <div>
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
