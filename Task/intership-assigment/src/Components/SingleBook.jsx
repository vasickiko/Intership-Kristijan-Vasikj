function SingleBook({ id, title, author, genre, img, searchQuery }) {

  const highlightMatch = (text) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi'); 
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: 'bold', color: 'red' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="book-card">
      <img src={img} alt={title} className="book-card__image" />
      <h1 className="book-card__title">{highlightMatch(title)}</h1>
      <p className="book-card__author">{highlightMatch(author)}</p>
      <p className="book-card__genre">{highlightMatch(genre)}</p>
    </div>
  );
}

export default SingleBook;
