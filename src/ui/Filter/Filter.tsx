import { Popover, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { FilterContent } from './FilterContent/FilterContent';

type FilterProps = {
  className?: string;
};

export const Filter = ({ className = '' }: FilterProps) => {
  return (
    <Popover
      placement="bottomRight"
      content={<FilterContent />}
      title="Фильтр"
      trigger="click"
      className={className}
    >
      <Button icon={<FilterOutlined />}>Задать фильтр</Button>
    </Popover>
  );
};
