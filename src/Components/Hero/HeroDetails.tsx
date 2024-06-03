import StarRating from '../StarRating'

type PropsType = {
    data: {
        id: number;
        backdrop_path: string;
        title: string;
        overview: string;
        original_name?: string;
        name?: string;
        vote_average: number;
        vote_count: number;
    }
    isExpanded: boolean;
    toggleExpand: ()=>void;
}


const HeroDetails = ({data , isExpanded, toggleExpand}:PropsType) => {
    const truncateText = (text: string, limit: number) => {
        const words = text.split(' ');
        if (words.length > limit) {
          return words.slice(0, limit).join(' ') + '...';
        }
        return text;
      };

  return (
    <div className="md:absolute md:top-0 md:z-10 md:flex md:flex-col md:justify-center md:bottom-0 md:left-10 md:p-4 md:w-4/12 hero-image">
        <h1 className="text-2xl text-white">{data?.title || data?.name}</h1>
        <div className="flex items-center gap-2">
            <StarRating rating={data.vote_average} />
            <p className="text-white text-sm">( {data.vote_count} )</p>
        </div>
        <p className="text-white">
            {isExpanded ? data?.overview : truncateText(data?.overview || '', 50)}
            {data?.overview.split(' ').length > 50 && (
                <span className="text-red-500 cursor-pointer" onClick={toggleExpand}>
                {isExpanded ? ' Show Less' : ' Read More'}
                </span>
            )}
        </p>
  </div>
  )
}

export default HeroDetails