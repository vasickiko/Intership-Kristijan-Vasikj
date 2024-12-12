function SingleBook({title, author, genre, img }) {
    return (
      <div className="flex flex-col w-full sm:w-[20%] lg:w-[15%] p-2 rounded-sm gap-1 sm:gap-0">
        <img src={img} alt="" className="mb-2 w-full h-auto object-cover"/>
        <h1 className="font-bold text-3xl sm:text-base text-white">{title}</h1>
        <p className="text-2xl sm:text-base text-white">{author}</p>
        <p className="sm:text-xs text-gray-500">{genre}</p>
      </div>
    );
  }
  
  export default SingleBook;
  