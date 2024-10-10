import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../context/UserContext';

export default function MovieView() {
  const { movieId } = useParams();
  const { user } = useContext(UserContext); // assuming user contains userId and token
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(movieId);

    fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${movieId}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setDirector(data.director);
        setYear(data.year);
        setDescription(data.description);
        setGenre(data.genre);
        setComments(data.comments);
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch movie data!',
          icon: 'error',
        });
      });
  }, [movieId]);

  const addComment = () => {
    const token = user.token || localStorage.getItem('token'); // Retrieve token from localStorage if not available in user context
  
    if (!newComment.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Comment cannot be empty!',
        icon: 'error',
      });
      return;
    }
  
    if (!token) {  // Check if the token exists
      Swal.fire({
        title: 'Error!',
        text: 'You must be logged in to add a comment.',
        icon: 'error',
      });
      return;
    }
  
    fetch(`https://movieapp-api-lms1.onrender.com/movies/addComment/${movieId}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ensure token is sent properly
      },
      body: JSON.stringify({ comment: newComment, userId: user.id }),
    })
    .then(res => res.json())
    .then(data => {
      console.log('Response data:', data);
      if (data && data.updatedMovie) {
        setComments(data.updatedMovie.comments);
        setNewComment("");
        setShowModal(false);
        Swal.fire({
          title: 'Success!',
          text: 'Comment added successfully!',
          icon: 'success',
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add comment!',
          icon: 'error',
        });
      }
    })
    .catch(error => {
      console.error('Error adding comment:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add comment!',
        icon: 'error',
      });
    });
  };
  
  
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle>Director: {director}</Card.Subtitle>
              <Card.Text>Year: {year}</Card.Text>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Genre: {genre}</Card.Subtitle>
              <Card.Subtitle>Comments:</Card.Subtitle>
              {comments.length === 0 ? (
                <Card.Text>No comments</Card.Text>
              ) : (
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index}>{comment.comment}</li>
                  ))}
                </ul>
              )}
              {user?.id ? (
                <Button variant="primary" block="true" onClick={() => setShowModal(true)}>Add Comment</Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">Log in to leave a comment</Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <textarea 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            className="form-control" 
            placeholder="Type your comment here..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={addComment}>Add Comment</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
