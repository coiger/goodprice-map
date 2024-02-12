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

  const isFoodCategory = (category: string) =>
    category.includes('양식') || category.includes('일식') || category.includes('중식') || category.includes('한식');

  const isKoreanFoodCategory = (category: string) => category.includes('한식');

  const compareCategory = (a: string, b: string) => {
    if (isFoodCategory(a) && !isFoodCategory(b)) return -1;
    if (!isFoodCategory(a) && isFoodCategory(b)) return +1;

    if (isKoreanFoodCategory(a) && !isKoreanFoodCategory(b)) return -1;
    if (!isKoreanFoodCategory(a) && isKoreanFoodCategory(b)) return +1;
    if (isKoreanFoodCategory(a) && isKoreanFoodCategory(b)) {
      if (a === '한식_일반' || b === '한식_기타') return -1;
      if (a === '한식_기타' || b === '한식_일반') return +1;
    }

    if (b.includes('기타')) return -1;
    if (a.includes('기타')) return +1;

    return a.localeCompare(b);
  };

  return (
    <List
      className={styles.list}
      itemLayout='horizontal'
      dataSource={categoryList.sort(compareCategory)}
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
