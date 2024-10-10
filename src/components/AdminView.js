import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditMovie from './EditMovie';
import Swal from 'sweetalert2';
import axios from 'axios'

const fetchData = async () => {
  try {
    const response = await axios.get('https://movieapp-api-lms1.onrender.com/movies/getMovies');
    return response.data.movies;  
  } catch (error) {
    console.error(error);
  }
};

export default function AdminView(movie) {
  const [movies, setMovies] = useState([]);
  const [movieId] = useState(movie.id);

  useEffect(() => {
    fetchData().then((data) => setMovies(data || []));  
  }, []);

  const refreshMovies = () => {
    fetchData().then((data) => setMovies(data || []));  
  };

  function deleteMovie(movie) {
    fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${movie._id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error === "Error in Saving") {
          Swal.fire({
            icon: "error",
            title: "Unsuccessful Movie Deletion",
            text: data.message
          })
        } else {
          Swal.fire({
            icon: "success",
            title: "Movie Deleted"
          })
          refreshMovies();
        }
      })
  }

  return (
    <>
      <h1 className="text-center my-4">Admin Dashboard</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie._id}</td>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>{movie.description}</td>
              <td>{movie.genre}</td>
              <td>
                {movie.comments.length > 0 ? (
                  movie.comments.map((comment) => (
                    <p key={comment._id}>
                      {comment.userId}: {comment.comment}
                    </p>
                  ))
                ) : (
                  <p>No comments</p>
                )}
              </td>
              <td style={{ display: 'flex', alignItems: 'center' }}>
              <EditMovie movie={movie} fetchData={refreshMovies} />
              <Button className="btn btn-danger btn-sm m-2" onClick={() => deleteMovie(movie)}>Delete</Button>
          </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}