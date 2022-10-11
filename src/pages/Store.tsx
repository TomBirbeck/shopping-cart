import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Filter } from '../components/Filter';
import { StoreItem } from '../components/StoreItem';
import { apiCall } from '../utilities/itemsApiCall';

export function Store() {
  const [storeItems, setStoreItems] = useState<Array<any>>([]);
  const [filter, setFilter] = useState<any>('');

  useEffect(() => {
    async function getItems() {
      if (filter) {
        const data = await apiCall(filter);
        console.log('filter', filter);
        setStoreItems(data);
      } else {
        const data = await apiCall();
        setStoreItems(data);
        console.log('all');
      }
    }
    getItems();
  }, [filter]);

  return (
    <>
      <Filter setFilter={setFilter} filter={filter} />
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
