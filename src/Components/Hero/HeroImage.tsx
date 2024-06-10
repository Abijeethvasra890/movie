import './Hero.css'

type PropsType = {
    imageBaseUrl : string;
    data :{
        id: number;
        backdrop_path: string;
        title: string;
        overview: string;
        original_name?: string;
        name?: string;
        vote_average: number;
        vote_count: number;
    }
}

const HeroImage = ({data , imageBaseUrl}:PropsType ) => {
  return (
    <div>
        <img
            className="md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[80%] object-cover hero-image"
            src={`${imageBaseUrl}${data?.backdrop_path}`}
            alt={data?.title || data?.name}
            />
    </div>
  )
}

export default HeroImage