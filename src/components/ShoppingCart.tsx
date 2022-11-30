import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { CartItem } from './CartItem';
import { useState, useEffect } from 'react';
import { apiCall } from '../utilities/itemsApiCall';
import { BsCart4 } from 'react-icons/bs';
import CheckoutPage from './Stripe/CheckoutPage';
// import storeItems from "../data/items.json"

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [storeItems, setStoreItems] = useState<Array<any>>([]);

  useEffect(() => {
    async function getItems() {
      const data = await apiCall();
      setStoreItems(data);
    }
    getItems();
  }, []);
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <BsCart4 /> Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className='ms-auto fw-bold fs-5'>
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
        <CheckoutPage />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
