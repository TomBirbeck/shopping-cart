import HomeImages from '../components/HomeImages';
import { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const [images, setImages] = useState<Array<any>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getHomeItems() {
      const res = await fetch('https://fakestoreapi.com/products?limit=3');
      const data = await res.json();
      setImages(data);
    }
    getHomeItems();
  }, []);

  console.log(images);

  return (
    <>
      <h1 className='text-center text-light fs-1 fw-bold'>One Stop Shop</h1>
      <h2 className='text-center text-light fs-3 fst-italic mb-5'>
        "For all your shopping needs"
      </h2>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {images.map((item) => (
          <Col key={item.id}>
            <HomeImages {...item} />
          </Col>
        ))}
      </Row>
      <div className='d-flex justify-content-center mt-5'>
        <Button
          className='btn btn-primary btn-lg'
          onClick={() => navigate('/Store')}
        >
          Go to Store
        </Button>
      </div>
    </>
  );
}
