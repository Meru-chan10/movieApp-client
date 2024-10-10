import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';

export default function AddMovie() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const createMovie = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/addMovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, director, year, description, genre }),
      });

      const data = await response.json();

      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Unsuccessful Movie Creation',
          text: data.error,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Movie Added',
        });
        navigate('/movies');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Unsuccessful Movie Creation',
        text: 'An error occurred while adding movie.',
      });
    }

    setTitle('');
    setDirector('');
    setYear('');
    setDescription('');
    setGenre('');
  };

  return (
    <>
      <h1 className="my-5 text-center">Add Movie</h1>
      <Form onSubmit={createMovie}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            required
            value={title}
            onChange={handleInputChange(setTitle)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Director:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Director"
            required
            value={director}
            onChange={handleInputChange(setDirector)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Year"
            required
            value={year}
            onChange={handleInputChange(setYear)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            required
            value={description}
            onChange={handleInputChange(setDescription)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Genre"
            required
            value={genre}
            onChange={handleInputChange(setGenre)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-5">
          Submit
        </Button>
      </Form>
    </>
  );
}