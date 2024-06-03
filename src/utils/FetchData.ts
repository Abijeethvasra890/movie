const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTNjZDU0MGJiYzM2NDllZTdkOGE1NjNkOGUyMGYxNiIsInN1YiI6IjY2NGM3MjIxNDAzYjNhNmE1NWYyZGJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GnalJftHLk5kkCH9JHxvnwXGBIpWBUExxAcB53liOw8'
    }
  };

type Propstype = {
    searchTerm:string;
    mainTerm: string;
    thirdTerm?: string;
}

export const fetchData = async ({mainTerm, searchTerm, thirdTerm}:Propstype): Promise<any> => {
    try {
        //console.log(`https://api.themoviedb.org/3/${mainTerm}/${searchTerm}/${thirdTerm}`);
        const url = thirdTerm !=null
        ? `https://api.themoviedb.org/3/${searchTerm}/${mainTerm}/${thirdTerm}`
        : `https://api.themoviedb.org/3/${mainTerm}/${searchTerm}`;

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
      //  console.log(data.cast);
        return data;
    } catch (err) {
        console.error('Failed to fetch data:', err);
        throw err;
    }
};

export const searchMovies = async (query:string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchMovieTrailer = async (movieId: number): Promise<any> => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos`;
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('Failed to fetch movie trailer:', err);
    throw err;
  }
};
