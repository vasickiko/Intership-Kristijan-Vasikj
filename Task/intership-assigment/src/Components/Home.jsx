import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books } from '../books.js';
import SingleBook from './SingleBook';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState('author'); 

  useEffect(() => {
    const query = searchParams.get('query') || '';
    setSearchQuery(query);

    const lowerCaseQuery = query.toLowerCase();
    const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery) ||
        book.genre.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredBooks(query ? filtered : books);
  }, [searchParams]);

  useEffect(() => {
    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'author') {
        return a.author.localeCompare(b.author);
      } else if (sortOption === 'genre') {
        return a.genre.localeCompare(b.genre);
      }
      return 0;
    });
    setFilteredBooks(sortedBooks);
  }, [sortOption]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchParams({ query: searchQuery });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="flex overflow-y-hidden py-6 px-3  container flex-col">
      <div className="flex flex-col sm:flex-row justify-between mb-5 gap-4">
        <div className="w-full sm:order-2 sm:w-[40%] flex gap-0">
          <input type="text" value={searchQuery} onChange={handleSearch} className="placeholder:italic placeholder:text-gray-500 border p-2 text-white w-full rounded-sm rounded-r-none bg-transparent border-r-0 border-white" placeholder="Search by title, author, or genre"/>
          <button onClick={handleSearchSubmit} className="p-2 rounded-sm rounded-l-none bg-blue-500 text-white w-[25%] sm:w-auto">Search</button>
        </div>
        <select value={sortOption} onChange={handleSortChange} className="border bg-transparent text-white border-none order-1 rounded-sm p-2 w-full sm:w-auto mt-2 sm:mt-0">
          <option value="title" className='text-black'>Sort by Title</option>
          <option value="author" className='text-black'>Sort by Author (Default)</option>
          <option value="genre" className='text-black'>Sort by Genre</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-5 mt-10">
        {filteredBooks.length > 0 ? (filteredBooks.map((book) => (<SingleBook key={book.id} title={book.title} author={book.author} genre={book.genre} img={book.image}/>))) 
        :(<p className='text-white text-3xl'>No results found</p>)}
      </div>
    </div>
  );
}

export default Home;
