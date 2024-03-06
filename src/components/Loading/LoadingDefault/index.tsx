import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadingDefault: React.FC = () => <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;

export default LoadingDefault;