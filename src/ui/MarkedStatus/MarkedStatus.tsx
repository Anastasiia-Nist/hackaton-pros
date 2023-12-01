import { CheckCircleOutlined } from '@ant-design/icons';

type MarkedStatus = {
  isMarked: boolean;
  routePath: string;
};

export const MarkedStatus = ({ isMarked }: MarkedStatus) => {
  if (isMarked) {
    return <CheckCircleOutlined style={{ color: '#07c500' }} />;
  }

  return null;
};
