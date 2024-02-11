import { Space } from 'antd';
import CheckableTag from 'antd/es/tag/CheckableTag';
import { memo } from 'react';

interface CategoryFilterProps {
  categoryList: string[];
  categoryFilter: string[];
  setCategoryFilter: (categoryFilter: string[]) => void;
}

function CategoryFilter({ categoryList, categoryFilter, setCategoryFilter }: CategoryFilterProps) {
  const handleChange = (tag: string, checked: boolean) => {
    const nextCategoryFilter = checked ? [...categoryFilter, tag] : categoryFilter.filter(t => t !== tag);
    setCategoryFilter(nextCategoryFilter);
  };

  return (
    <Space size={[0, 8]} wrap>
      {categoryList
        .sort((a, b) => a.localeCompare(b))
        .map(category => (
          <CheckableTag
            key={category}
            checked={categoryFilter.includes(category)}
            onChange={checked => handleChange(category, checked)}>
            {category}
          </CheckableTag>
        ))}
    </Space>
  );
}

export default memo(CategoryFilter);
