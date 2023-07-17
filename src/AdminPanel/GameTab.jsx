import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewButton from './components/NewButton';

export default function GameTab({ games }) {
  const fields = ['ID', 'Game', 'Developer', 'Publisher', 'Release Date', 'Status'];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGames, setselectedGames] = useState([]);
  const itemsPerPage = 7;

  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = games.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(games.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle previous page navigation
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to handle next page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <div className='flex justify-end gap-5'>
        <NewButton />
        <div>
          {/* <ActionButton selectedComments={selectedComments} /> */}
          <input
            type='text'
            placeholder='Search'
            className='input-bordered input w-full max-w-xs'
          />
        </div>
      </div>
      <div className='m-3 overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input type='checkbox' className='checkbox' />
                </label>
              </th> */}
              {fields.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {currentItems.map((game, index) => (
              <tr key={game._id}>
                <th>
                  <label>
                    <input
                      type='checkbox'
                      className='checkbox'
                      data-testid={`selected-game-${game._id}`}
                      checked={selectedGames.includes(game._id)}
                      onChange={() => {
                        if (selectedGames.includes(game._id)) {
                          setselectedGames((prevSelectedGames) =>
                            prevSelectedGames.filter((id) => id !== game._id),
                          );
                        } else {
                          setselectedGames((prevSelectedGames) => [...prevSelectedGames, game._id]);
                        }
                      }}
                    />
                  </label>
                </th>
                <td data-testid={`selected-game-${index + 1}`}>{indexOfFirstItem + index + 1}</td>
                <td>
                  <Link to={`/game/${game._id}`}>{game.name}</Link>
                </td>
                <td>{game.developer}</td>
                <td>{game.publisher}</td>
                <td>{game.releaseDate}</td>
                <td>{game.status}Public</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className='m-auto text-center'>
        <div className='join flex justify-around'>
          <button className='btn-ghost join-item btn' onClick={goToPreviousPage}>
            «
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={
                pageNumber === currentPage
                  ? 'btn-ghost btn-active join-item btn'
                  : 'btn-ghost join-item btn'
              }
            >
              {pageNumber}
            </button>
          ))}
          <button className='btn-ghost join-item btn' onClick={goToNextPage}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}
