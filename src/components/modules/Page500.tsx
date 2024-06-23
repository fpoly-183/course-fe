import React from 'react';
import systemErrorImg from '../../assets/img/500.png';

interface IPage500 {
  errorMessage?: string;
}

const Page500 = ({ errorMessage }: IPage500) => {
  return (
    <div className="min-vh-100 flex flex-row align-items-center">
      <div className="container w-full">
        <div className=" flex justify-content-center">
          <div className="my-auto md:w-5/12">
            <h1 className="float-start display-3 me-4">500</h1>

            <h3 className={`mt-2`}>Oops! Something went wrong.</h3>
            <h6>Our developers are working on this.</h6>

            <p className="text-medium-emphasis float-start">
              {errorMessage || 'An uncaught error occurs. Please contact the administrator. '}
            </p>
          </div>
          <div className="md:w-7/12">
            <img className="w-full" src={systemErrorImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page500;
