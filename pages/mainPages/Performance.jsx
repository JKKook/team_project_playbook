import { useQuery } from 'react-query';
import { getApiData } from '../index';
import PerformanceList from '@/src/components/molecules/PerformanceList';

const Performance = () => {
  const { data } = useQuery('image', getApiData);
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <>
      <PerformanceList performances={data} />
    </>
  );
};
export default Performance;
