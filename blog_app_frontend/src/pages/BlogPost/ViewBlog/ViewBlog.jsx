import moment from 'moment';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import { getBlogByIdOnDashboard } from 'redux-thunk/thunk/BlogPost/BlogPost';

const ViewBlog = () => {
  const { slug } = useParams();
  // const [comment, setComment] = useState('');
  // const { user } = useSelector((state) => state.AuthReducer);
  const { updatePostData: details
    // , comments
  } = useSelector(
    (state) => state.blogPost
  );
  const dispatch = useDispatch();
  // const addComment = (e) => {
  //   e.preventDefault();
  //   dispatch(postComment({ id: details._id, comment, userName: user.name }));
  //   setComment('');
  //   dispatch(postDetails(id));
  // };
  useEffect(() => {
    if (slug) {
      dispatch(getBlogByIdOnDashboard({
        slug
      }));
    }
  }, [slug]);


  return (
    details &&
    <div className='container'>
      <div className='row' style={{ marginTop: '20px' }}>
        <div className='col-12'>
          {(
            <div className='post__details'>
              <div className='post__header'>
                <div className='post__header__avator'>
                  {details.userName ? details.userName[0] : ''}
                </div>
                <div className='post__header__user'>
                  <span>{details.userName}</span>
                  <span>{moment(details.updatedAt).format('MMM Do YY')}</span>
                </div>
              </div>
              <br/>
              <div className='post__body'>
                <h1 className='post__body__title'>{details.title}</h1>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={`/blog-post-images/${details.image}`} alt={details.image} width="400" height="400" />
              </div>
              <br/>
              <div className='post__body'>
                <div className='post__body__details'>
                  <div dangerouslySetInnerHTML={{ __html: details.body }} />
                </div>
              </div>
              {/* {user ? (
                <>
                  <div className='post__comment'>
                    <form onSubmit={addComment}>
                      <div className='group'>
                        <input
                          type='text'
                          className='group__control'
                          placeholder='Write a comment...'
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                        />
                      </div>
                      <div className='group'>
                        <input
                          type='submit'
                          value='Post comment'
                          className='btn btn-default'
                        />
                      </div>
                    </form>
                  </div>
                  <Comments comments={comments} />
                </>
              ) : (
                ''
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewBlog
