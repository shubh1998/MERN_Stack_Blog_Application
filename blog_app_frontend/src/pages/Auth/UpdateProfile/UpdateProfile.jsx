import * as yup from 'yup'
import { Formik } from 'formik'
import { BsPencil, BsEyeFill } from 'react-icons/bs';
import { fetchProfileDetails, updateProfileDetails, userLogin } from 'redux-thunk/thunk/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import AppLoader from 'components/AppLoader/AppLoader';
import { LOADER_TYPE } from 'utils/constants/index';
import { useState } from 'react';
import { useEffect } from 'react';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  name: yup.string().min(5, 'Password must be at least 5 characters').max(32, 'Password can not exceed 32 characters').required('Required')
})

const formInitialValues = {
  email: '',
  name: ''
}

const formFields = {
  email: 'email',
  name: 'name'
}


const UpdateProfile = () => {
  const { submitButtonLoader } = useSelector((state) => state.loader)
  const { profile } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [editDisable, setEditDisable] = useState(true)

  const onUpdateProfileFormSubmit = (values) => {
    const { email, name } = values
    dispatch(updateProfileDetails({ email, name }))
    handleEnableEdit()
  }

  const handleEnableEdit = () => {
    setEditDisable(!editDisable)
  }

  useEffect(() => {
    dispatch(fetchProfileDetails())
  }, [])

  return (
    profile && <>
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
                initialValues={{
                  [formFields.name]: profile.name,
                  [formFields.email]: profile.email
                } || formInitialValues}
                validationSchema={loginSchema}
                onSubmit={(values, actions) => {
                  onUpdateProfileFormSubmit(values)
                }}
              >
                {
                  ({ errors, touched, values, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                    // setFormValues({ setFieldValue })
                    return (
                      <form onSubmit={handleSubmit}>
                        <div className='group' style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h3 className='form-heading' style={{ textAlign: 'right' }}>
                            Profile
                          </h3>
                          {editDisable ? <BsPencil className='icon' onClick={handleEnableEdit} /> : <BsEyeFill className='icon' onClick={handleEnableEdit} />}
                        </div>

                        <div className='group'>
                          <input
                            autoComplete='off'
                            type='text'
                            name={formFields.name}
                            className='group__control'
                            placeholder='Enter Name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            disabled={editDisable}
                          />
                          {
                            errors.name && touched.name ? <span className='error-msg'>{errors.name}</span> : null
                          }
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
                            disabled={editDisable}
                          />
                          {
                            errors.email && touched.email ? <span className='error-msg'>{errors.email}</span> : null
                          }
                        </div>

                        {
                          !editDisable && (
                            <div className='group'>
                              <button type='submit' className='btn btn-default btn-block'>
                                {
                                  submitButtonLoader ?
                                    <AppLoader variant={LOADER_TYPE.PULSE} size={5} /> :
                                    'Update Profile'
                                }
                              </button>
                            </div>
                          )
                        }
                      </form>
                    )
                  }
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile
