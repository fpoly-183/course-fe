import { MdSmartphone } from 'react-icons/md';

const ForgotPassword = () => {
  return (
    <div className="min-vh-100 flex flex-row align-items-center">
      <div className="container">
        <div className="flex justify-center">
          <div className="w-full max-w-lg mx-4 md:mx-0">
            <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
              <form>
                <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
                <p className="text-gray-500 mb-4">Enter your phone to receive a reset key</p>
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 rounded-l-md px-3 py-2">
                    <MdSmartphone className="text-2xl" />
                  </div>
                  <input
                    type="text"
                    className="rounded-r-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Phone number"
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0"
                  >
                    Send reset key
                  </button>
                  <div className="text-gray-500">
                    Just remembered?{' '}
                    <a href="#/login" className="text-blue-500 hover:text-blue-600">
                      Sign in
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
