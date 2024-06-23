import logo from '@/assets/img/logo.jpg';
import { resetEntity } from '@/components/modules/auth/auth.reducer';
import { ToastSuccess } from '@/components/shared/toast/Toast';
import { RootState } from '@/reducers';
import { useRouter } from '@/shared/utils/hooks/useRouter';
import { AppDispatch } from '@/store';

import { Formik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineEye as Visibility, AiOutlineEyeInvisible as VisibilityOff } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ILoginForm } from './auth.api';
import FormUpdate from '@/components/shared/form/FormUpdate';
import FormInput from '@/components/shared/form/FormInput';
import { InputText } from 'primereact/inputtext';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Button } from 'primereact/button';

const changeFormCheck = (name: string, item: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
  if (item.target.checked) {
    setFieldValue(name, 1);
  } else {
    setFieldValue(name, 0);
  }
};

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigate, location } = useRouter();
  const state = location.state;

  const { loginSuccess, user } = useSelector((state: RootState) => state.authentication);
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required('Không được để trống')
      .matches(/^\S+$/, 'Tên đăng nhập không được chứa khoảng trống')
      .matches(/^\w+$/, `Tên đăng nhập không được viết dấu hoặc chứa ký tự đặc biệt`)
      .max(255, 'Số ký tự tối đa là 255 ký tự'),
    password: Yup.string().trim().required('Không được để trống'),
  });

  useEffect(() => {
    if (user) {
      const statePath = state?.path || '/';
      const redirectPath = statePath.includes('login') ? '/' : statePath;
      navigate(redirectPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (loginSuccess) {
      navigate(`/`);
      ToastSuccess('Đăng nhập thành công');
    }
    dispatch(resetEntity());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSuccess]);

  const initialValues: ILoginForm = {
    username: '',
    password: '',
    rememberMe: false,
  };

  return (
    <div className="container pt-3">
      <div className="flex justify-center">
        <div className="col-span-12 sm:col-span-8 lg:col-span-6 xl:col-span-4">
          <div className="my-3">
            <img src={logo} />

            <h2 className="cl-gray-900 fw-bold mb-2 text-center">Đăng nhập</h2>
          </div>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values) => {
              // dispatch(fetching());
              // dispatch(login(values));
              navigate('/');
              ToastSuccess('Đăng nhập thành công');
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
              // <CForm onSubmit={handleSubmit}>
              //   <div className="mb-3">
              //     <div className="col-span-12">
              //       <label className="fw-bold" htmlFor="username">
              //         Tài khoản
              //       </label>
              //       <CFormInput
              //         value={values.username}
              //         onChange={handleChange}
              //         id="username"
              //         name="username"
              //         placeholder="Tài khoản"
              //         autoComplete="off"
              //       />
              //       {!!errors.username && touched.username && (
              //         <div className={`text-red-500 ${!!errors.username && touched.username ? 'block' : 'hidden'}`}>
              //           {errors.username}
              //         </div>
              //       )}
              //     </div>
              //   </div>
              //   <div>
              //     <div className="col-span-12">
              //       <label className="fw-bold" htmlFor="password">
              //         Mật khẩu
              //       </label>
              //       <div className="position-relative p-0">
              //         <CFormInput
              //           value={values.password}
              //           onChange={handleChange}
              //           type={showPassword ? 'text' : 'password'}
              //           id="password"
              //           name="password"
              //           placeholder="Mật khẩu"
              //           autoComplete="new-password"
              //         />
              //         <div
              //           className="position-absolute"
              //           style={{ right: '10px', top: '20%', cursor: 'pointer' }}
              //           onClick={() => setShowPassword((prev) => !prev)}
              //         >
              //           {showPassword ? <VisibilityOff /> : <Visibility />}
              //         </div>
              //       </div>
              //       {!!errors.password && touched.password && (
              //         <div className={`text-red-500 ${!!errors.password && touched.password ? 'block' : 'hidden'}`}>
              //           {errors.password}
              //         </div>
              //       )}
              //     </div>
              //   </div>

              //   <div className="my-3 align-items-center">
              //     <div className="col-span-12flex align-items-center text-nowrap justify-content-between">
              //       <CFormCheck
              //         id="rememberMe"
              //         name="rememberMe"
              //         onChange={(item: ChangeEvent<HTMLInputElement>) =>
              //           changeFormCheck('rememberMe', item, setFieldValue)
              //         }
              //         label="Ghi nhớ mật khẩu"
              //         checked={values.rememberMe}
              //         className="fw-bold"
              //       />
              //       <CLink
              //         className="fw-bold cl-brand-700 text-decoration-none text-center text-nowrap"
              //         id="forgot"
              //         name="forgot"
              //         href="#/forgot"
              //       >
              //         Quên mật khẩu
              //       </CLink>
              //     </div>
              //   </div>

              //   <div>
              //     <div className="col-span-12">
              //       <CButton className="custom-btn-lg btn-brand-600 fw-bold w-100" type="submit">
              //         Đăng nhập
              //       </CButton>
              //     </div>
              //   </div>
              // </CForm>
              <FormUpdate
                // isLoading={initialState.loading}
                title={''}
                onSubmit={() => {
                  handleSubmit();
                }}
              >
                <>
                  <FormInput
                    direction="horizontal"
                    id="username"
                    isRequired
                    label="Tên tài khoản"
                    value={values.username}
                    onChange={(e) => {
                      setFieldValue('username', e).then();
                    }}
                    errors={errors}
                    touched={touched}
                  />
                  <div>
                    <div className="col-span-12">
                      <label className="font-bold" htmlFor="password">
                        Mật khẩu
                      </label>
                      <div className="relative p-0">
                        <InputText
                          value={values.password}
                          onChange={handleChange}
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          placeholder="Mật khẩu"
                          autoComplete="new-password"
                          className="w-full"
                        />
                        <div
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <IoEyeOff className="h-6 w-6 text-gray-500" />
                          ) : (
                            <IoEye className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                      </div>
                      {!!errors.password && touched.password && (
                        <div className={`text-red-500 ${!!errors.password && touched.password ? 'block' : 'hidden'}`}>
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="my-3 flex items-center">
                    <div className="col-span-12 flex items-center justify-between whitespace-nowrap">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        onChange={(e: CheckboxChangeEvent) => changeFormCheck('rememberMe', e.value, setFieldValue)}
                        checked={values.rememberMe}
                        className="font-bold"
                      />
                      <a
                        className="font-bold text-brand-700 no-underline text-center whitespace-nowrap"
                        id="forgot"
                        href="/forgot"
                      >
                        Quên mật khẩu
                      </a>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <Button className="custom-btn-lg btn-brand-600 fw-bold w-100" type="submit">
                      Đăng nhập
                    </Button>
                  </div>
                </>
              </FormUpdate>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
