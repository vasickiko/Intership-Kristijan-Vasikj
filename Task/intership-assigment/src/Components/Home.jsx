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
    <div className="home container">
  <div className="home__header">
    <div className="home__search-wrapper">
      <input type="text" value={searchQuery} onChange={handleSearch} className="home__search-input" placeholder="Search by title, author, or genre"/>
      <button onClick={handleSearchSubmit} className="home__search-button">Search</button>
    </div>

    <select value={sortOption} onChange={handleSortChange} className="home__sort-dropdown">
      <option value="title" className="home__sort-option">Sort by Title</option>
      <option value="author" className="home__sort-option">Sort by Author (Default)</option>
      <option value="genre" className="home__sort-option">Sort by Genre</option>
    </select>
  </div>

  <div className="home__book-list">
    {filteredBooks.length > 0 ? (filteredBooks.map((book) => (<SingleBook key={book.id} title={book.title} author={book.author} genre={book.genre} img={book.image} searchQuery={searchQuery}/>))
    ):(
      <p className="home__no-results">No results found</p>
    )}
  </div>
</div>

  );
}

export default Home;
