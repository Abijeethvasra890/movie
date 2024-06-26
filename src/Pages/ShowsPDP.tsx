import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Carousel from '../Components/Carousel/Carousel';
import DetailCard from '../Components/DetailCard';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero/Hero';

type Params = {
  id: string;
};

const ShowsPDP = () => {
  const { id } = useParams<Params>();

  return (
    <div className="flex flex-col-reverse md:flex md:flex-row bg-black overflow-hidden">
      <div>
          <Navbar />
        </div>
        <div className="md:ml-28">
          <Hero main="tv" search={id || ''} pdp={true} />
          <DetailCard mainTerm='tv' searchTerm={id || ''} id={id || ''} />
          <Carousel main={id || ''} search="tv" third='aggregate_credits' pdppage={true}/>
          <Footer />
          <div className="mb-20 md:mb-0"></div>
      </div>
    </div>

  );
};

export default ShowsPDP;
