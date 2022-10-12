import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';

type apiProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export function StoreItem({ id, title, price, image, description }: apiProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const[open, setOpen] = useState<boolean>(false)
  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={image}
        height='500px'
        // style={{ objectFit: 'cover' }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-4'>{title}</span>
          <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        
        <div className='mt-auto'>
        <p onClick={()=>{setOpen(!open)}}>Description</p>
        {open && <div className='p-2 mb-2'>{description}</div>}
          {quantity === 0 ? (
            <Button className='w-100' onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className='d-flex align-items-center flex-column'
              style={{ gap: '0.5rem' }}
            >
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ gap: '0.5rem' }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className='fs-3 me-1'>{quantity}</span>
                  in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button variant='danger' onClick={() => removeFromCart(id)}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
