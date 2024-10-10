import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import  UserContext  from '../context/UserContext';
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import MovieView from '../pages/MovieView';

export default function MovieCard({ movie }) {
    console.log('Movie prop:', movie); 
  
    const {_id, title, director, year, description, genre } = movie || {};

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    return (
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>Director:</Card.Subtitle>
          <Card.Text>{director}</Card.Text>
          <Card.Subtitle>Year:</Card.Subtitle>
          <Card.Text>{year}</Card.Text>
          <Card.Subtitle>Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>Genre:</Card.Subtitle>
          <Card.Text>{genre}</Card.Text>
          <Link to={`/movie/${_id}`}>
            <Button variant="primary">Leave a Comment</Button>
            </Link>
        </Card.Body>
      </Card>
    );
  }
  