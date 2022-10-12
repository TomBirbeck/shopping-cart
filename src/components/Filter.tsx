import { useState, Dispatch, SetStateAction, useEffect } from 'react';

type filterProps = {
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
};

export function Filter({ setFilter, filter }: filterProps) {
  const [category, setCategory] = useState<Array<any>>([]);

  function handleChange(e: { target: { value: string } }) {
    // console.log("hey I'm the event", e.target.value);
    setFilter(e.target.value);
  }

  useEffect(() => {
    async function getCategories(): Promise<void> {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const data = await res.json();
      setCategory(data);
    }
    getCategories();
  }, []);
  // console.log('cats', category);

  return (
    <div>
      <form>
        <label className='m-2 text-light'>Filter Items </label>
        <select
          name='item filter'
          onChange={handleChange}
          defaultValue='select'
        >
          <option value='select' disabled hidden>
            Select category
          </option>
          {category.map((cat) => {
            return (
              <option value={cat} key={cat}>
                {cat}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}
