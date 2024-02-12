import { memo } from 'react';
import { Checkbox, List } from 'antd';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categoryList: string[];
  categoryFilter: string[];
  setCategoryFilter: (categoryFilter: string[]) => void;
}

function CategoryFilter({ categoryList, categoryFilter, setCategoryFilter }: CategoryFilterProps) {
  const checkAll = categoryList.length === categoryFilter.length;
  const indeterminate = categoryFilter.length > 0 && categoryFilter.length < categoryList.length;

  const handleCheckAllChange = (checked: boolean) => {
    setCategoryFilter(checked ? categoryList : []);
  };

  const handleChange = (category: string, checked: boolean) => {
    const nextCategoryFilter = checked ? [...categoryFilter, category] : categoryFilter.filter(c => c !== category);
    setCategoryFilter(nextCategoryFilter);
  };

  const toggleCheckedAll = () => {
    handleCheckAllChange(!checkAll);
  };

  const toggleChecked = (category: string) => {
    handleChange(category, !categoryFilter.includes(category));
  };

  return (
    <List
      className={styles.list}
      itemLayout='horizontal'
      dataSource={categoryList.sort((a, b) => a.localeCompare(b))}
      header={
        <List.Item className='no-padding pointer' onClick={() => toggleCheckedAll()}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={e => handleCheckAllChange(e.target.checked)}
            checked={checkAll}>
            모두 선택
          </Checkbox>
        </List.Item>
      }
      renderItem={category => (
        <List.Item className='pointer' onClick={() => toggleChecked(category)}>
          <Checkbox
            key={category}
            checked={categoryFilter.includes(category)}
            onChange={e => handleChange(category, e.target.checked)}>
            {category}
          </Checkbox>
        </List.Item>
      )}
    />
  );
}

export default memo(CategoryFilter);
