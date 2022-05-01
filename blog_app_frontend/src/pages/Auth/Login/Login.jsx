import * as yup from 'yup'
import { Formik } from 'formik'
import BgImage from '../BgImage/BgImage';
import { useNavigate } from 'react-router-dom';
import { userLogin } from 'redux-thunk/thunk/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import AppLoader from 'components/AppLoader/index';
import { LOADER_TYPE } from 'utils/constants/index';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').max(32, 'Password can not exceed 32 characters').required('Required')
})

const formInitialValues = {
  email: '',
  password: ''
}

const formFields = {
  email: 'email',
  password: 'password'
}

const Login = () => {
  const { submitButtonLoader } = useSelector((state) => state.loader)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLoginFormSubmit = (values) => {
    const { email, password } = values
    dispatch(userLogin({ email, password, navigate }))
  }

  return (
    <>
      <div className='row mt-80'>
        <div className='col-8'>
          <BgImage />
        </div>
        <div className='col-4'>
          <div className='account'>
            <div className='account__section'>
              <Formik
                initialValues={formInitialValues}
                validationSchema={loginSchema}
                onSubmit={(values, actions) => {
                  onLoginFormSubmit(values)
                }}
              >
                {
                  ({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div className='group'>
                        <h3 className='form-heading'>Login</h3>
                      </div>
                      <div className='group'>
                        <input
                          autoComplete='off'
                          type='email'
                          name={formFields.email}
                          className='group__control'
                          placeholder='Enter Email'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {
                          errors.email && touched.email ? <span className='error-msg'>{errors.email}</span> : null
                        }
                      </div>
                      <div className='group'>
                        <input
                          autoComplete='off'
                          type='password'
                          name={formFields.password}
                          className='group__control'
                          placeholder='Create Password'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        {
                          errors.password && touched.password ? <span className='error-msg'>{errors.password}</span> : null
                        }
                      </div>
                      <div className='group'>
                        <button type='submit' className='btn btn-default btn-block'>
                          {
                            submitButtonLoader ?
                            <AppLoader variant={LOADER_TYPE.PULSE} size={5} /> :
                            'Login'
                          }
                        </button>
                      </div>
                    </form>
                  )
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
