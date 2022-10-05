import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
// import storeItems from '../data/items.json';
import { apiCall } from '../utilities/itemsApiCall';

export function Store() {
  const [storeItems, setStoreItems] = useState<Array<any>>([]);

  useEffect(() => {
    async function getItems() {
      const data = await apiCall();
      setStoreItems(data);
    }
    getItems();
  }, []);
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
