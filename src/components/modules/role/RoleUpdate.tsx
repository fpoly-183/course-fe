import { ToastSuccess } from '@/components/shared/toast/Toast';
import { RootState } from '@/reducers';
import { mappingStatus, Status, statusArray } from '@/shared/enumeration/status';
import { INewUser, IUser } from '@/shared/model/user.model';
import { useRouter } from '@/shared/utils/hooks/useRouter';
import { AppDispatch } from '@/store';

import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { AiOutlineEye as Visibility, AiOutlineEyeInvisible as VisibilityOff } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { getEntity } from './role.api';
import { fetching, selectEntityById } from './role.reducer';
import FormUpdate from '@/components/shared/form/FormUpdate';
import FormInput from '@/components/shared/form/FormInput';
import { InputText } from 'primereact/inputtext';
import { IoEye } from 'react-icons/io5';
import { IoEyeOff } from 'react-icons/io5';
const AccountUpdate = () => {
  const { params, navigate, location } = useRouter();
  const { id } = params;
  const currentLocation = location.pathname;
  const isDetail = currentLocation.includes('detail');
  const { initialState } = useSelector((state: RootState) => state.account);
  const { updateEntitySuccess } = initialState;
  const dispatch = useDispatch<AppDispatch>();
  const account = useSelector(selectEntityById(id || ''));
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  const initialValues: INewUser = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    address: '',
    status: Status.ACTIVE,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required('Vui lòng nhập tên').max(255, 'Số ký tự tối đa là 255 ký tự'),
    account: Yup.string().trim().required('Vui lòng nhập tên tài khoản').max(255, 'Số ký tự tối đa là 255 ký tự'),
    email: Yup.string()
      .trim()
      .required('Vui lòng nhập tên email')
      .email('Địa chỉ email không hợp lệ')
      .max(255, 'Số ký tự tối đa là 255 ký tự'),
    phone: Yup.string().trim().required('Vui lòng nhập số điện thoại').max(255, 'Số ký tự tối đa là 255 ký tự'),
    password: Yup.string().when('id', {
      is: (value: IUser) => !id,
      then: Yup.string()
        .trim()
        .min(8, 'Mật khẩu cần nhiều hơn 8 ký tự')
        .matches(/^[0-9a-zA-Z!@#$%^&*()-_=+\[\]{}|;:'",.<>\/?]+$/, 'Mật khẩu không hợp lệ') // eslint-disable-line
        .required('Mật khẩu không được để trống'),
    }),
    confirmPassword: Yup.string().when('id', {
      is: (value: IUser) => !id,
      then: Yup.string()
        .trim()
        .required('Vui lòng nhập lại mật khẩu')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
    }),
  });

  useEffect(() => {
    if (id) {
      dispatch(fetching());
      dispatch(getEntity(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Formik
      initialValues={account || initialValues}
      validationSchema={validationSchema}
      // validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(value) => {
        // dispatch(fetching());
        // if (id) {
        //   dispatch(updateEntity(value as IUser));
        // } else {
        //   dispatch(createEntity(value));
        // }
        window.history.back();
        ToastSuccess(account ? 'Chỉnh sửa thành công' : 'Tạp mới thành công');
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, setFieldValue }) => (
        <FormUpdate
          isDetail={isDetail}
          isLoading={initialState.loading}
          title={isDetail ? 'Chi tiết quảng cáo' : account ? 'Chỉnh sửa quảng cáo' : 'Thêm mới quảng cáo'}
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
              disabled={isDetail}
            />
            <FormInput
              direction="horizontal"
              id="fullName"
              isRequired
              label="Họ và tên"
              value={values.fullName}
              onChange={(e) => {
                setFieldValue('fullName', e).then();
              }}
              errors={errors}
              touched={touched}
              disabled={isDetail}
            />
            <FormInput
              direction="horizontal"
              id="email"
              isRequired
              label="Email"
              value={values.email}
              onChange={(e) => {
                setFieldValue('email', e).then();
              }}
              errors={errors}
              touched={touched}
              disabled={isDetail}
            />
            <FormInput
              direction="horizontal"
              id="phone"
              isRequired
              label="Số điện thoại"
              value={values.phone}
              onChange={(e) => {
                setFieldValue('phone', e).then();
              }}
              errors={errors}
              touched={touched}
              disabled={isDetail}
            />
            {!account ? (
              // <Col xs="12">
              //   <Form.Label className="text-medium-md mb-6 label-gray-700 required-start">
              //     Mật khẩu
              //   </Form.Label>
              //   <InputGroup className="input-end-group">
              //     <Form.Control
              //       className="form-height-44"
              //       name="password"
              //       autoComplete="new-password"
              //       type={passwordVisible ? 'text' : 'password'}
              //       value={values.password}
              //       onChange={handleChange}
              //       onBlur={handleBlur}
              //       isInvalid={!!errors.password && touched.password}
              //     />
              //     <InputGroup.Text
              //       id="search-addon"
              //       className="cursor-pointer form-height-44"
              //       onClick={(e) => {
              //         e.stopPropagation();
              //         setPasswordVisible(!passwordVisible);
              //       }}
              //     >
              //       {passwordVisible ? <VisibilityOff /> : <Visibility />}
              //     </InputGroup.Text>
              //   </InputGroup>
              //   <Form.Check
              //     isInvalid
              //     className={`${!!errors.password && touched.password ? 'd-block' : 'd-none'} text-danger`}
              //   >
              //     {errors.password}
              //   </Form.Check>
              // </Col>
              <div className="col-span-12">
                <label htmlFor="password" className="block text-medium-md mb-6 text-gray-700 required-start">
                  Mật khẩu
                </label>
                <div className="relative">
                  <InputText
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full h-11 ${
                      !!errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPasswordVisible(!passwordVisible);
                    }}
                  >
                    {passwordVisible ? <IoEyeOff className="text-gray-500" /> : <IoEye className="text-gray-500" />}
                  </div>
                </div>
                {!!errors.password && touched.password && (
                  <div className="mt-2 text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
            ) : // <FormInput
            //   direction="horizontal"
            //   id="password"
            //   isRequired
            //   label="Mật khẩu"
            //   value={values.password}
            //   onChange={(e) => {
            //     setFieldValue('password', e).then();
            //   }}
            //   errors={errors}
            //   touched={touched}
            //   disabled={isDetail}
            // />
            null}
          </>
        </FormUpdate>
        // <CForm onSubmit={handleSubmit} className="custom-form">
        //   <CRow className="justify-content-center">
        //     <CCol xs={12} md={8} lg={6}>
        //       <h3 className="mb-3">{account ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản'}</h3>
        //       <CRow className="gap-20">
        //         <CCol xs="12">
        //           <CFormLabel className="mb-6 label-gray-700">Tên tài khoản</CFormLabel>

        //           <CFormInput
        //             className="form-height-44"
        //             name="username"
        //             autoComplete="off"
        //             value={values.username}
        //             onChange={handleChange}
        //             onBlur={handleBlur}
        //             invalid={!!errors.username && touched.username}
        //             disabled={isDetail}
        //           />
        //           <CFormFeedback invalid className={!!errors.username && touched.username ? 'd-block' : 'd-none'}>
        //             {errors.username}
        //           </CFormFeedback>
        //         </CCol>
        //         <CCol xs="12">
        //           <CFormLabel className="mb-6 label-gray-700">Họ và tên</CFormLabel>
        //           <CFormInput
        //             className="form-height-44"
        //             name="fullName"
        //             value={values.fullName}
        //             onChange={handleChange}
        //             onBlur={handleBlur}
        //             invalid={!!errors.fullName && touched.fullName}
        //             disabled={isDetail}
        //           />
        //           <CFormFeedback invalid className={!!errors.fullName && touched.fullName ? 'd-block' : 'd-none'}>
        //             {errors.fullName}
        //           </CFormFeedback>
        //         </CCol>

        //         <CCol xs="12">
        //           <CFormLabel className="mb-6 label-gray-700">Email</CFormLabel>
        //           <CFormInput
        //             className="form-height-44"
        //             name="email"
        //             value={values.email}
        //             onChange={handleChange}
        //             onBlur={handleBlur}
        //             invalid={!!errors.email && touched.email}
        //             disabled={isDetail}
        //           />
        //           <CFormFeedback invalid className={!!errors.email && touched.email ? 'd-block' : 'd-none'}>
        //             {errors.email}
        //           </CFormFeedback>
        //         </CCol>

        //         <CCol xs="12">
        //           <CFormLabel className="mb-6 label-gray-700">Số điện thoại</CFormLabel>
        //           <CFormInput
        //             className="form-height-44"
        //             name="phone"
        //             value={values.phone}
        //             onChange={handleChange}
        //             onBlur={handleBlur}
        //             invalid={!!errors.phone && touched.phone}
        //             disabled={isDetail}
        //           />
        //           <CFormFeedback invalid className={!!errors.phone && touched.phone ? 'd-block' : 'd-none'}>
        //             {errors.phone}
        //           </CFormFeedback>
        //         </CCol>

        //         {!account ? (
        //           <CCol xs={12}>
        //             <CRow>
        //               <CCol xs="12" md="6">
        //                 <CFormLabel className="mb-6 label-gray-700">Mật khẩu</CFormLabel>

        //                 <CInputGroup className="input-end-group">
        //                   <CFormInput
        //                     className="form-height-44"
        //                     name="password"
        //                     autoComplete="new-password"
        //                     type={passwordVisible ? 'text' : 'password'}
        //                     value={values.password}
        //                     onChange={handleChange}
        //                     onBlur={handleBlur}
        //                     invalid={!!errors.password && touched.password}
        //                   />
        //                   <CInputGroupText
        //                     id="search-addon"
        //                     className="cursor-pointer form-height-44"
        //                     onClick={(e) => {
        //                       e.stopPropagation();
        //                       setPasswordVisible(!passwordVisible);
        //                     }}
        //                   >
        //                     {passwordVisible ? <VisibilityOff /> : <Visibility />}
        //                   </CInputGroupText>
        //                 </CInputGroup>
        //                 <CFormFeedback invalid className={!!errors.password && touched.password ? 'd-block' : 'd-none'}>
        //                   {errors.password}
        //                 </CFormFeedback>
        //               </CCol>

        //               <CCol xs="12" md="6">
        //                 <CFormLabel className="mb-6 label-gray-700">Xác nhận mật khẩu</CFormLabel>
        //                 <CInputGroup className="input-end-group">
        //                   <CFormInput
        //                     className="form-height-44"
        //                     name="confirmPassword"
        //                     type={confirmPasswordVisible ? 'text' : 'password'}
        //                     value={values.confirmPassword}
        //                     onChange={handleChange}
        //                     onBlur={handleBlur}
        //                     invalid={!!errors.confirmPassword && touched.confirmPassword}
        //                   />
        //                   <CInputGroupText
        //                     id="search-addon"
        //                     className="cursor-pointer form-height-44"
        //                     onClick={(e) => {
        //                       e.stopPropagation();
        //                       setConfirmPasswordVisible(!confirmPasswordVisible);
        //                     }}
        //                   >
        //                     {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
        //                   </CInputGroupText>
        //                 </CInputGroup>
        //                 <CFormFeedback
        //                   invalid
        //                   className={!!errors.confirmPassword && touched.confirmPassword ? 'd-block' : 'd-none'}
        //                 >
        //                   {errors.confirmPassword}
        //                 </CFormFeedback>
        //               </CCol>
        //             </CRow>
        //           </CCol>
        //         ) : null}

        //         <CCol xs="12">
        //           <CFormLabel className="mb-6 label-gray-700">Trạng thái</CFormLabel>
        //           <CFormSelect
        //             className="form-height-44"
        //             name="status"
        //             value={values.status}
        //             onChange={handleChange}
        //             onBlur={handleBlur}
        //             invalid={!!errors.status && touched.status}
        //             disabled={isDetail}
        //           >
        //             {statusArray.map((item, index) => (
        //               <option key={index} value={item}>
        //                 {mappingStatus[item]}
        //               </option>
        //             ))}
        //           </CFormSelect>
        //           <CFormFeedback invalid className={!!errors.status && touched.status ? 'd-block' : 'd-none'}>
        //             {errors.status}
        //           </CFormFeedback>
        //         </CCol>
        //       </CRow>

        //       <CRow className="mt-3">
        //         <CCol xs={12} className="flex justify-content-center">
        //           <CButton
        //             variant="outline"
        //             color="dark"
        //             onClick={() => {
        //               window.history.back();
        //             }}
        //             className="mx-2"
        //           >
        //             Huỷ
        //           </CButton>
        //           <CButton type="submit" className="mx-2">
        //             Lưu
        //           </CButton>
        //         </CCol>
        //       </CRow>
        //     </CCol>
        //   </CRow>
        // </CForm>
      )}
    </Formik>
  );
};

export default AccountUpdate;
