import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
// import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';
import { apiCall } from '../utilities/itemsApiCall';
import { useState, useEffect } from 'react';

type CartItemProps = {
  id: number;
  quantity: number;
  // price: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [storeItems, setStoreItems] = useState<Array<any>>([]);

  useEffect(() => {
    async function getItems() {
      const data = await apiCall();
      setStoreItems(data);
    }
    getItems();
  }, []);
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;

  return (
    <Stack direction='horizontal' gap={2}>
      <img
        src={item.image}
        style={{ height: '75px', width: '125px', objectFit: 'cover' }}
      />
      <div className='me-auto'>
        <div>
          {item.name}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: '.65rem' }}>
              {quantity}x
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: '.75rem' }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant='outline-danger'
        size='sm'
        onClick={() => {
          removeFromCart(item.id);
        }}
      >
        X
      </Button>
    </Stack>
  );
}
