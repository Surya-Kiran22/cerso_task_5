import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import './Home.css'; // Let's add some custom CSS

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get('https://food-express-backend.onrender.com/api/foods');
        setFoods(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter(food => 
    food.name.toLowerCase().includes(search.toLowerCase()) || 
    food.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <Container>
          <h1 className="display-4 fw-bold mb-4 shadow-text">Craving something delicious?</h1>
          <p className="lead mb-4 shadow-text">Get your favorite meals delivered fast to your door.</p>
          <Form className="d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="Search for dishes, restaurants, or cuisines..."
              className="search-bar shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Container>
      </div>

      <Container className="mt-5 mb-5">
        {!search && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold mb-0">🔥 Popular Dishes</h3>
            </div>
            <Row className="mb-5">
              {foods.slice(0, 3).map(food => (
                <Col lg={4} md={6} sm={12} key={food._id} className="mb-4">
                  <Card className="food-card h-100 shadow-sm border-0 popular-highlight">
                    <div className="card-img-wrapper">
                      <Card.Img 
                        variant="top" 
                        src={food.imageUrl || 'https://via.placeholder.com/800x400?text=Food'} 
                        alt={food.name}
                        className="food-img"
                      />
                      <Badge bg="danger" text="light" className="category-badge">
                        Top Rated
                      </Badge>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="fw-bold mb-0">{food.name}</Card.Title>
                        <span className="price-tag fw-bold text-success">${food.price.toFixed(2)}</span>
                      </div>
                      <Card.Text className="text-muted flex-grow-1 food-desc">
                        {food.description}
                      </Card.Text>
                      <Button variant="danger" className="w-100 fw-bold rounded-pill shadow-sm add-btn">
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        <h3 className="mb-4 fw-bold">{search ? 'Search Results' : 'Explore Full Menu'}</h3>
        <Row>
          {filteredFoods.map((food, index) => {
            if (!search && index < 3) return null; // Skip first 3 if not searching (already in popular)
            return (
            <Col lg={3} md={4} sm={6} xs={12} key={food._id} className="mb-4">
              <Card className="food-card h-100 shadow-sm border-0">
                <div className="card-img-wrapper" style={{ height: '180px' }}>
                  <Card.Img 
                    variant="top" 
                    src={food.imageUrl || 'https://via.placeholder.com/800x400?text=Food'} 
                    alt={food.name}
                    className="food-img"
                  />
                  <Badge bg="warning" text="dark" className="category-badge" style={{ fontSize: '0.75rem', padding: '5px 8px' }}>
                    {food.category}
                  </Badge>
                </div>
                <Card.Body className="d-flex flex-column p-3">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <Card.Title className="fw-bold mb-0 fs-6">{food.name}</Card.Title>
                  </div>
                  <div className="mb-2">
                    <span className="fw-bold text-success">${food.price.toFixed(2)}</span>
                  </div>
                  <Card.Text className="text-muted flex-grow-1 food-desc" style={{ fontSize: '0.85rem' }}>
                    {food.description}
                  </Card.Text>
                  <Button variant="outline-danger" size="sm" className="w-100 fw-bold rounded-pill add-btn mt-2">
                    Add
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            );
          })}
          {filteredFoods.length === 0 && (
            <div className="text-center w-100 py-5">
              <h4 className="text-muted">No dishes found matching your search.</h4>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;
