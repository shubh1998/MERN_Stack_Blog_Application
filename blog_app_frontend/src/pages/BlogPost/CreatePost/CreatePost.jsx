import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLoader from 'components/AppLoader/AppLoader'
import { useDispatch, useSelector } from 'react-redux';
import { LOADER_TYPE } from 'utils/constants/index';
import { useEffect, useReducer, useState } from 'react';
import { createBlogPost, getBlogByIdOnDashboard, updateBlogPost } from 'redux-thunk/thunk/BlogPost/BlogPost';
import { resetUpdatePostData } from 'redux-thunk/redux/BlogPost/blogPostSlice';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3] }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

const initialStates = {
  title: '',
  description: '',
  image: '',
  slug: '',
  slugButton: false,
  imagePreview: '',
  currentImage: 'Choose Image',
}

const CreatePost = () => {
  const { state } = useLocation()
  const blogIdForUpdate = state?._id || null
  console.log(blogIdForUpdate)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [body, setBody] = useState('')
  const [postState, setPostState] = useReducer((state, newState) => ({
    ...state,
    ...newState
  }), initialStates)
  const { submitButtonLoader } = useSelector((state) => state.loader)
  const { updatePostData } = useSelector((state) => state.blogPost)

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { title, description, slug, image } = postState
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('slug', slug);
    formData.append('body', body);
    if(blogIdForUpdate && updatePostData){
      dispatch(updateBlogPost({
        formData,
        navigate,
        blogId: blogIdForUpdate
      }))
    } else{
      dispatch(createBlogPost({
        formData,
        navigate
      }))
    }
  }

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setPostState({
        [e.target.name]: e.target.files[0]
      })
      setPostState({
        currentImage: e.target.files[0].name
      })
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostState({
          imagePreview: reader.result
        })
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleURL = (e) => {
    e.preventDefault();
    setPostState({ slug: postState.slug.trim().split(' ').join('-'), slugButton: false });
  };

  const handleChange = (e) => {
    setPostState({ [e.target.name]: e.target.value })
    if (e.target.name === "title") {
      const createSlug = e.target.value.trim().split(' ').join('-');
      setPostState({ slug: createSlug });
    } else if (e.target.name === "slug") {
      setPostState({ slugButton: true });
    }
  }

  useEffect(() => {
    if (blogIdForUpdate) {
      dispatch(getBlogByIdOnDashboard({
        blogId: blogIdForUpdate
      }))
    }
    return ()=>{
      dispatch(resetUpdatePostData())
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (updatePostData) {
      console.log(updatePostData)
      setPostState({
        title: updatePostData.title,
        description: updatePostData.description,
        slug: updatePostData.slug,
        image: new File([updatePostData.image],  '/blog-post-images/' + updatePostData.image),

        // new File('/blog-post-images/' + updatePostData.image),
        imagePreview: '/blog-post-images/' + updatePostData.image,
        currentImage: 'updatePostData.image',
       })
       setBody(updatePostData.body)
    }
  }, [updatePostData])

  return (
    <div className='container'>
      <div className='create'>
        <form onSubmit={onFormSubmit}>
          <div className='row ml-minus-15 mr-minus-15'>
            <div className='col-12 p-15'>
              <div className='card'>
                <h3 className='card__h3'>Create a new post</h3>
                <div className='group'>
                  <label htmlFor='title'>Post Title</label>
                  <input
                    className='group__control'
                    autoComplete='off'
                    type='text'
                    placeholder='Post title...'
                    name="title"
                    onChange={handleChange}
                    value={postState.title}
                  />
                </div>
                <div className='group'>
                  <label htmlFor='slug'>Post Slug URL</label>
                  <input
                    className='group__control'
                    placeholder='Post URL...'
                    autoComplete='off'
                    type='text'
                    name="slug"
                    onChange={handleChange}
                    value={postState.slug}
                  />
                </div>
                <div className='group'>
                  {
                    postState.slugButton ? (
                      <button className='btn btn-default' onClick={handleURL}>
                        Update Slug
                      </button>
                    ) : ('')
                  }
                </div>
                <div className='group'>
                  <label htmlFor='description'>Meta Description (Max 250 words)</label>
                  <textarea
                    className='group__control'
                    placeholder='meta description...'
                    maxLength='250'
                    cols='30'
                    rows='10'
                    name='description'
                    onChange={handleChange}
                    value={postState.description}
                  ></textarea>
                  <p className='length'>
                    {postState.description ? postState.description.length : 0}
                  </p>
                </div>
                <div className='group'>
                  <label htmlFor='body'>Post body</label>
                  <ReactQuill
                    theme='snow'
                    placeholder='Post body...'
                    modules={modules}
                    formats={formats}
                    name="body"
                    value={body}
                    onChange={setBody}
                  />
                </div>
                <div className='group'>
                  <label htmlFor='image' className='image__label'>
                    {postState.currentImage}
                  </label>
                  <input
                    type='file'
                    name='image'
                    id='image'
                    onChange={fileHandle}
                  />
                </div>
                <div className='group'>
                  <div className='imagePreivew'>
                    {postState.imagePreview ? <img src={postState.imagePreview} alt="image_preview" /> : ''}
                  </div>
                </div>

                <div className='group'>
                  <button type='submit' className='btn btn-default btn-block'>
                    {
                      submitButtonLoader ?
                        <AppLoader variant={LOADER_TYPE.PULSE} size={5} /> :
                        (blogIdForUpdate && updatePostData) ? 'Update Post' : 'Create Post'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
