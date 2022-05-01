import BgImage from '../BgImage/BgImage';
import * as yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux';
import { userRegister } from 'redux-thunk/thunk/Auth/Auth';

const registerSchema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').max(20, 'Name can not exceed 20 characters').required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').max(32, 'Password can not exceed 32 characters').required('Required')
})

const formInitialValues = {
  name: '',
  email: '',
  password: ''
}

const formFields = {
  name: 'name',
  email: 'email',
  password: 'password'
}

const Register = () => {
  const dispatch = useDispatch()

  const onRegisterFormSubmit = (values) => {
    const { name, email, password } = values
    dispatch(userRegister({ name, email, password }))
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
                validationSchema={registerSchema}
                onSubmit={(values, actions) => {
                  onRegisterFormSubmit(values)
                }}
              >
                {
                  ({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div className='group'>
                        <h3 className='form-heading'>Register</h3>
                      </div>
                      <div className='group'>
                        <input
                          type='text'
                          name={formFields.name}
                          className='group__control'
                          placeholder='Enter Name'
                          autoComplete='off'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        {
                          errors.name && touched.name ? <span className='error-msg'>{errors.name}</span> : null
                        }
                      </div>
                      <div className='group'>
                        <input
                          type='email'
                          name={formFields.email}
                          className='group__control'
                          placeholder='Enter Email'
                          autoComplete='off'
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
                          type='password'
                          name={formFields.password}
                          className='group__control'
                          placeholder='Create Password'
                          autoComplete='off'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {
                          errors.password && touched.password ? <span className='error-msg'>{errors.password}</span> : null
                        }
                      </div>
                      <div className='group'>
                        <button type='submit' className='btn btn-default btn-block'>
                          Register
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
export default Register;
