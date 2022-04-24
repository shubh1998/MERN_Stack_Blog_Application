import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Blogs</title>
        <meta name='description' content='User login form' />
      </Helmet>
      <div className='row mt-80'>
        <h1>Blog App Home</h1>
      </div>
    </>
  )
}

export default Home
