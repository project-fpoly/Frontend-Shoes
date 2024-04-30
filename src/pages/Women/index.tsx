import { useEffect } from 'react';
import Discover from '../../components/Women/Discover'
import Trending from '../../components/Women/Trending'
import { scrollToTop } from '../../hooks/utils';

const Women = () => {
  useEffect(() => {
    scrollToTop()
  }, []);

  return (
    <div className="px-10">
      <Trending />
      <Discover />
    </div>
  )
}
export default Women
