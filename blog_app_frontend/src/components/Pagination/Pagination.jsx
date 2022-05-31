import { Link } from 'react-router-dom';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
const Pagination = ({ total, page, limit, handlePagination }) => {
	let totalPages = Math.ceil(total / limit);

	const pageNumbers = () => {
		const paginationLinks = [];

    for (let pageValue = 1; pageValue <= totalPages; pageValue++) {
			paginationLinks.push(
				<li key={pageValue} className={pageValue == page ? 'active' : ''} onClick={() => handlePagination({page: pageValue})} >
					<Link to=''>{pageValue}</Link>
				</li>
			);
		}
		return paginationLinks;
	};

	const nextPage = () => {
		if (page < totalPages) {
			return (
				<li onClick={() => handlePagination({page: parseInt(page) + 1})}>
					<Link to=''>
						<BsChevronDoubleRight />
					</Link>
				</li>
			);
		}
	};

	const previousPage = () => {
		if (page > 1) {
			return (
				<li onClick={() => handlePagination({page: parseInt(page) - 1})}>
					<Link to=''>
						<BsChevronDoubleLeft />
					</Link>
				</li>
			);
		}
	};

	return totalPages > 1 && total && (
		<div className='pagination'>
			{previousPage()}
			{pageNumbers()}
			{nextPage()}
		</div>
	);
};
export default Pagination;
