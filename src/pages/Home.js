import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {


    return (
        <Row>
            <Col className="mt-5 pt-5 text-center mx-auto">
                <h1>Welcome to FilmHive</h1>
                <p>Buzz into the World of Cinema with FilmHive!</p>
                <Link className="btn btn-primary" to={"/movies"}>Check our lists!</Link>
            </Col>
        </Row>
    )
}