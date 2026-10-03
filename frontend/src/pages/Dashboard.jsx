import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Table, Button, Form, Modal, Alert } from 'react-bootstrap';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '' });

  const fetchFoods = async () => {
    try {
      const res = await axios.get('https://food-express-backend.onrender.com/api/foods');
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditingId(null);
    setFormData({ name: '', description: '', price: '', category: '' });
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://food-express-backend.onrender.com/api/foods/${editingId}`, formData);
      } else {
        await axios.post('https://food-express-backend.onrender.com/api/foods', formData);
      }
      fetchFoods();
      handleClose();
    } catch (err) {
      console.error('Error saving food', err);
    }
  };

  const handleEdit = (food) => {
    setEditingId(food._id);
    setFormData({ name: food.name, description: food.description, price: food.price, category: food.category });
    handleShow();
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure?')) {
      try {
        await axios.delete(`https://food-express-backend.onrender.com/api/foods/${id}`);
        fetchFoods();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user) return <Container className="mt-4"><Alert variant="danger">Please login to view dashboard.</Alert></Container>;
  if (!user.isAdmin) return <Container className="mt-4"><Alert variant="warning">Access Denied. Only Admins can manage foods.</Alert></Container>;

  return (
    <Container className="mt-4">
      <h2>Welcome, {user.name}</h2>
      
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h4>Manage Foods</h4>
        <Button variant="success" onClick={handleShow}>Add New Food</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food._id}>
              <td>{food.name}</td>
              <td>{food.category}</td>
              <td>${food.price}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(food)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(food._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {foods.length === 0 && <tr><td colSpan="4" className="text-center">No foods found</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Food' : 'Add Food'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingId ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default Dashboard;
