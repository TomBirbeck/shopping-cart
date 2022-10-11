type apiCallProps = {
  filter?: string | undefined;
};

export async function apiCall(filter: apiCallProps): Promise<Array<any>> {
  let data;
  if (filter) {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${filter}`
    );
    data = await res.json();
  } else {
    const res = await fetch('https://fakestoreapi.com/products');
    data = await res.json();
  }
  return data;
}
