import { Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import styles from './FloatButton.module.css';

function MyGithubBtn() {
  return (
    <a
      href='https://github.com/coiger/goodprice.map'
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Open github repository'>
      <Button className={`${styles.btn} ${styles['my-github-btn']}`} type='text' icon={<GithubOutlined />} />
    </a>
  );
}

export default MyGithubBtn;
