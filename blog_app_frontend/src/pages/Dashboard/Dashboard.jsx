import moment from 'moment';
import { Link } from 'react-router-dom'
import { BsArchive } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { deleteBlogOnDashboard, fetchBlogsOnDashboard } from 'redux-thunk/thunk/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'components/Pagination/Pagination';

const Dashboard = () => {
  const dispatch = useDispatch()
  const { dashboardPostsData } = useSelector(state => state.dashboard)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    dispatch(fetchBlogsOnDashboard(pagination))
    // eslint-disable-next-line
  }, [])

  const handleDeletePost = (blogId) => {
    dispatch(deleteBlogOnDashboard({ blogId }))
  }

  const handlePagination = ({ page }) => {
    const paginationUpdatedValue = {
      page,
      limit: 10
    }
    setPagination(paginationUpdatedValue)
    dispatch(fetchBlogsOnDashboard(paginationUpdatedValue))
  }

  return (
    dashboardPostsData &&
    <div className='container'>
      <div className='row'>
        <div className='col-12 p-15'>
          {
            dashboardPostsData.result.length ?
              dashboardPostsData.result.map((post) => (
                <div className='dashboard__posts' key={post._id}>
                  <div className='dashboard__posts__title'>
                    <Link to={`/details/${post.slug}`}>{post.title}</Link>
                    <span>Published {moment(post.updatedAt).fromNow()}</span>
                  </div>
                  <div className='dashboard__posts__links'>
                    {/* <Link to={`/updateImage/${post._id}`}>
                    <BsImage className='icon' />
                  </Link>
                  <Link to={`/edit/${post._id}`}>
                    <BsPencil className='icon' />
                  </Link> */}
                    <BsArchive
                      onClick={() => handleDeletePost(post._id)}
                      className='icon'
                    />
                  </div>
                </div>
              )
              ) :
              <h1>No Posts Found</h1>
          }
          {
            dashboardPostsData.total_documents ?
            <Pagination
              page={pagination.page}
              limit={pagination.limit}
              total={dashboardPostsData.total_documents}
              handlePagination={handlePagination}
            /> : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
