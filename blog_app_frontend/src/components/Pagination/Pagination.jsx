import { Link } from 'react-router-dom';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
const Pagination = ({ total, page, limit, handlePagination }) => {
  let totalPages = Math.ceil(total / limit);
  const paginationLinks = [];

  const pageNumbers = () => {
    for (let pageValue = 1; pageValue <= totalPages; pageValue++) {
      paginationLinks.push(
        <li key={pageValue} className={pageValue === page ? 'active' : ''} onClick={() => handlePagination({ page: pageValue })} >
          <Link to=''>{pageValue}</Link>
        </li>
      );
    }
    return paginationLinks;
  };


  return totalPages > 1 && total && (
    <div className='pagination'>
      {
        page > 1 && (
          <li onClick={() => handlePagination({ page: parseInt(page) - 1 })}>
            <Link to=''>
              <BsChevronDoubleLeft />
            </Link>
          </li>
        )
      }
      {pageNumbers()}
      {
        page < totalPages && (
          <li onClick={() => handlePagination({ page: parseInt(page) + 1 })}>
            <Link to=''>
              <BsChevronDoubleRight />
            </Link>
          </li>
        )
      }
    </div>
  );
};
export default Pagination;
