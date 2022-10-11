import { Card } from 'react-bootstrap';

type HomeImagesProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export default function HomeImages({
  id,
  title,
  price,
  image,
  description,
}: HomeImagesProps) {
  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={image}
        height='500px'
        // style={{ objectFit: 'cover' }}
      />
    </Card>
  );
}
