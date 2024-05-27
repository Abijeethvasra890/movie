import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Carousel from '../Components/Carousel/Carousel';
import DetailCard from '../Components/DetailCard';
import Hero from '../Components/Hero';

type Params = {
  id: string;
};

const PDP = () => {
  const { id } = useParams<Params>();

  return (
    <div className="flex flex-col-reverse md:flex md:flex-row bg-black overflow-hidden">
      <div>
          <Navbar />
        </div>
        <div className="md:ml-28">
          <Hero main="movie" search={id || ''} pdp={true} />
          <DetailCard mainTerm='movie' searchTerm={id || ''} id={id || ''}/>
          <Carousel main={id || ''} search="movie" third='credits'/>
          <div className="mb-28"></div>
      </div>
    </div>

  );
};

export default PDP;
