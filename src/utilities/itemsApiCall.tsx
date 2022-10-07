export async function apiCall(): Promise<Array<any>> {
  //   const [items, setItems] = useState([]);
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
}
