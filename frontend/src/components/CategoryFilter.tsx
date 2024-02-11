import { Select } from 'antd';
import { memo } from 'react';

interface CategoryFilterProps {
  categoryList: string[];
  categoryFilter: string[];
  setCategoryFilter: (categoryFilter: string[]) => void;
}

function CategoryFilter({ categoryList, categoryFilter, setCategoryFilter }: CategoryFilterProps) {
  return (
    <Select
      mode='multiple'
      showSearch={false}
      style={{ width: '100%' }}
      value={categoryFilter.sort((a, b) => a.localeCompare(b))}
      onChange={setCategoryFilter}
      options={categoryList.map(category => ({ value: category }))}
    />
  );
}

export default memo(CategoryFilter);
