import moment from 'moment';
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Pagination from 'components/Pagination/Pagination';
import { fetchBlogsOnHome } from 'redux-thunk/thunk/Home/Home';

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allPosts } = useSelector(state => state.home)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  })

  const handlePagination = ({ page }) => {
    const paginationUpdatedValue = {
      page,
      limit: 10
    }
    setPagination(paginationUpdatedValue)
    dispatch(fetchBlogsOnHome(paginationUpdatedValue))
  }

  useEffect(() => {
    dispatch(fetchBlogsOnHome(pagination))
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {
        allPosts && (
          <div className='row' style={{ marginBottom: '30px', marginTop: '20px' }}>
              <div className='container'>
              <div className='col-12 home'>
                {
                  allPosts.result.length > 0 ? (
                    allPosts.result.map((post) => (
                      <Link to={`/details/${post.slug}`} key={post._id}>
                        <div className='row post-style' >
                          <div className='col-8'>
                            <div className='post'>
                              <div className='post__header'>
                                <div className='post__header__avator'>
                                  {post.userName[0]}
                                </div>
                                <div className='post__header__user'>
                                  <span>{post.userName}</span>
                                  <span>
                                    {moment(post.updatedAt).format('MMM Do YY')}
                                  </span>
                                </div>
                              </div>
                              <div className='post__body'>
                                <h1 className='post__body__title'>

                                  {post.title}

                                </h1>
                                <div className='post__body__details'>
                                  {
                                  post.body.replace(/<[^>]*>/g, '').length > 315
                                  ? post.body.replace(/<[^>]*>/g, '').slice(0, 315) + '...'
                                  : post.body.replace(/<[^>]*>/g, '')
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-4' style={{display: 'flex', justifyContent: 'center'}}>
                            <div className='post__image'>
                              <img src={`/blog-post-images/${post.image}`} alt={post.image} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <h1>No Posts Found</h1>
                  )
                }
              </div>
            </div>
            {
              allPosts.total_documents ?
                <Pagination
                  page={pagination.page}
                  limit={pagination.limit}
                  total={allPosts.total_documents}
                  handlePagination={handlePagination}
                /> : <></>
            }
          </div>
        )
      }

    </>
  )
}

export default Home
