import { Popover, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { FilterContent } from './FilterContent/FilterContent';
import { MainTableFilter } from 'store/filters/filtersSlice';

type FilterProps = {
  className?: string;
  onSubmit: (values: MainTableFilter) => void;
};

export const Filter = ({ className = '', onSubmit }: FilterProps) => {
  return (
    <Popover
      placement="bottomRight"
      content={<FilterContent onSubmit={onSubmit} />}
      title="Фильтр"
      trigger="click"
      className={className}
    >
      <Button icon={<FilterOutlined />}>Задать фильтр</Button>
    </Popover>
  );
};
