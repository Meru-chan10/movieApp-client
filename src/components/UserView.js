import { useEffect, useState, useContext } from 'react';
import MovieCard from '../components/MovieCard';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

export default function Movies() {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data.message !== "string") {
          setMovies(data.movies);
        } else {
          setMovies([]);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFetchData = () => {
    fetchData();
  };

  return (
    <>
      {
        (user.id !== null)
          ?
          movies.length > 0
            ?
            <>
              <h1 className='text-center mt-5'>Movies</h1>
              <Row>
                {
                  movies.map(movie => {
                    return (
                      <Col md={3}>
                        <MovieCard movie={movie} fetchData={handleFetchData} />
                      </Col>
                    );
                  })
                }
              </Row>
            </>
            :
            <>
              <h1>No Movie Found</h1>
            </>
          :
          <>
          <>
              <h1 className='text-center mt-5'>Movies</h1>
              <Row>
                {
                  movies.map(movie => {
                    return (
                      <Col md={3}>
                        <MovieCard movie={movie} fetchData={handleFetchData} />
                        
                      </Col>
                    );
                  })
                }
              </Row>
            </>
          </>
      }
    </>
  );
}