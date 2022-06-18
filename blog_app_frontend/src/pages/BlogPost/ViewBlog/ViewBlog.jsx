import moment from 'moment';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from "react-router-dom"
import { getBlogByIdOnDashboard, postComment } from 'redux-thunk/thunk/BlogPost/BlogPost';
import { getAuthToken } from 'utils/services/cookie.services';


const Comments = ({ comments }) => {
  return comments.length > 0
    ? comments.map((comment) => (
      <div key={comment._id} className='commentSection'>
        <div className='post__header'>
          <div className='post__header__avator'>
            {comment.userName ? comment.userName[0] : ''}
          </div>
          <div className='post__header__user'>
            <span>{comment.userName}</span>
            <span>{moment(comment.updatedAt).format('MMM Do YY')}</span>
          </div>
        </div>
        <div className='comment__body'>{comment.comment}</div>
      </div>
    ))
    : 'No comments';
};

const ViewBlog = () => {
  const { slug } = useParams();
  const { state } = useLocation()
  const blogId = state?.postId || null

  const [comment, setComment] = useState('');
  const authenticatedUser = getAuthToken()
  const { updatePostData: details
    , comments
  } = useSelector(
    (state) => state.blogPost
  );
  const dispatch = useDispatch();

  const addComment = (e) => {
    e.preventDefault();
    dispatch(postComment({ id: blogId || details._id, comment }));
    setComment('');
  };

  useEffect(() => {
    if (slug) {
      dispatch(getBlogByIdOnDashboard({
        slug,
        blogId
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
              <br />
              <div className='post__body'>
                <h1 className='post__body__title'>{details.title}</h1>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={`/blog-post-images/${details.image}`} alt={details.image} width="400" height="400" />
              </div>
              <br />
              <div className='post__body'>
                <div className='post__body__details'>
                  <div dangerouslySetInnerHTML={{ __html: details.body }} />
                </div>
              </div>
              {authenticatedUser ? (
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
                        <button
                          type='submit'
                          className='btn btn-default'
                          disabled={!comment.length}
                        >
                          Post comment
                        </button>
                      </div>
                    </form>
                  </div>
                  <Comments comments={comments} />
                </>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewBlog
