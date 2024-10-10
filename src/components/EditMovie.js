import { Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function EditMovie({ movie, fetchData }) {
    const [movieId, setMovieId] = useState(movie._id);
    const [title, setTitle] = useState(movie.title);
    const [director, setDirector] = useState(movie.director);
    const [year, setYear] = useState(movie.year);
    const [description, setDescription] = useState(movie.description);
    const [genre, setGenre] = useState(movie.genre);
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = () => {
        setShowEdit(true);
        
        setTitle(movie.title);
        setDirector(movie.director);
        setYear(movie.year);
        setDescription(movie.description);
        setGenre(movie.genre);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const editMovie = (e, movieId) => {
        e.preventDefault();
    
        fetch(`https://movieapp-api-lms1.onrender.com/movies/updateMovie/${movieId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title, 
                director: director,
                year: year,
                description: description,
                genre: genre
            })
        })
        .then(res => {
            return res.json().then(data => ({ data, ok: res.ok }));
          })
          .then(({ data, ok }) => {
            if (ok) { 
              Swal.fire({
                icon: 'success',
                title: 'Movie Successfully Updated',
                showConfirmButton: false,
                timer: 1500
              })
              closeEdit()
              fetchData() 
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
              })
              closeEdit()
            }
        })
    };

    useEffect(() => {
        setMovieId(movie._id);
        setTitle(movie.title);
        setDirector(movie.director);
        setYear(movie.year);
        setDescription(movie.description);
        setGenre(movie.genre);
    }, [movie]);

    return (
        <>
            <Button variant="primary" size="sm" onClick={openEdit}> Edit</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editMovie(e, movieId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="movieTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)} 
                                required/>
                        </Form.Group>
                        <Form.Group controlId="movieDirector">
                            <Form.Label>Director</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={director}
                                onChange={e => setDirector(e.target.value)} 
                                required/>
                        </Form.Group>
                        <Form.Group controlId="movieYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={year}
                                onChange={e => setYear(e.target.value)} 
                                required/>
                        </Form.Group>
                        <Form.Group controlId="movieDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={description}
                                onChange={e => setDescription(e.target.value)} 
                                required/>
                        </Form.Group>
                        <Form.Group controlId="movieGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={genre}
                                onChange={e => setGenre(e.target.value)} 
                                required/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => closeEdit()}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}