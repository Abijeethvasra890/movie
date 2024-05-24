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
}

export const fetchData = async ({mainTerm, searchTerm}:Propstype): Promise<any> => {
    try {
        console.log(`https://api.themoviedb.org/3/${mainTerm}/${searchTerm}`);
        const url = `https://api.themoviedb.org/3/${mainTerm}/${searchTerm}`
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Failed to fetch data:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
};
