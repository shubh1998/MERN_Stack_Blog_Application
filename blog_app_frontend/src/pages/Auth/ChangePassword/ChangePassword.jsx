import * as yup from 'yup'
import { Formik } from 'formik'
import { userChangePassword } from 'redux-thunk/thunk/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import AppLoader from 'components/AppLoader/AppLoader';
import { LOADER_TYPE } from 'utils/constants/index';

const loginSchema = yup.object({
  oldPassword: yup.string().min(5, 'Old Password must be at least 5 characters')
    .max(32, 'Old Password can not exceed 32 characters').required('Required'),
  newPassword: yup.string().min(5, 'New Password must be at least 5 characters')
    .max(32, 'New Password can not exceed 32 characters').required('Required'),
  confirmPassword: yup.string().min(5, 'Confirm Password must be at least 5 characters')
    .max(32, 'Confirm Password can not exceed 32 characters').required('Required')
    .oneOf([yup.ref('newPassword'), null], 'Confirm Passwords must match with new password')
    .required('Confirm Password is required')
  ,
})

const formInitialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const formFields = {
  oldPassword: 'oldPassword',
  newPassword: 'newPassword',
  confirmPassword: 'confirmPassword'
}

const ChangePassword = () => {
  const { submitButtonLoader } = useSelector((state) => state.loader)
  const dispatch = useDispatch()

  const onChangePasswordFormSubmit = (values) => {
    const { oldPassword, newPassword, confirmPassword } = values
    dispatch(userChangePassword({
      oldPassword, newPassword, confirmPassword
    }))
  }

  return (
    <div className='row'>
      <div className='col-12'>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
        }}>
          <div className='account__section'>
            <Formik
              initialValues={formInitialValues}
              validationSchema={loginSchema}
              onSubmit={(values, { resetForm }) => {
                onChangePasswordFormSubmit(values)
                resetForm()
              }}
            >
              {
                ({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className='group'>
                      <h3 className='form-heading' style={{ textAlign: 'center' }}>Change Password</h3>
                    </div>
                    <div className='group'>
                      <input
                        autoComplete='off'
                        type='password'
                        name={formFields.oldPassword}
                        className='group__control'
                        placeholder='Old Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.oldPassword}
                      />
                      {
                        errors.oldPassword && touched.oldPassword ? <span className='error-msg'>{errors.oldPassword}</span> : null
                      }
                    </div>
                    <div className='group'>
                      <input
                        autoComplete='off'
                        type='password'
                        name={formFields.newPassword}
                        className='group__control'
                        placeholder='New Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPassword}
                      />
                      {
                        errors.newPassword && touched.newPassword ? <span className='error-msg'>{errors.newPassword}</span> : null
                      }
                    </div>
                    <div className='group'>
                      <input
                        autoComplete='off'
                        type='password'
                        name={formFields.confirmPassword}
                        className='group__control'
                        placeholder='Confirm Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      />
                      {
                        errors.confirmPassword && touched.confirmPassword ? <span className='error-msg'>{errors.confirmPassword}</span> : null
                      }
                    </div>
                    <div className='group'>
                      <button type='submit' className='btn btn-default btn-block'>
                        {
                          submitButtonLoader ?
                            <AppLoader variant={LOADER_TYPE.PULSE} size={5} /> :
                            'Change Password'
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
  )
}

export default ChangePassword
