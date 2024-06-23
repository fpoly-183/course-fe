import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useState } from 'react';

const Register = () => {
  const [value, setValue] = useState('');
  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-9/12 lg:w-7/12 xl:w-6/12">
            <div className="shadow-lg rounded-lg">
              <div className="p-4">
                <form>
                  <h1 className="text-3xl font-bold">Register</h1>
                  <p className="text-gray-500">Create your account</p>
                  <div className="mb-3">
                    <div className="flex items-center">
                      <i className="pi pi-user mr-2"></i>
                      <InputText placeholder="Username" className="w-full" autoComplete="username" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center">
                      <i className="pi pi-envelope mr-2"></i>
                      <InputText placeholder="Email" className="w-full" autoComplete="email" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center">
                      <i className="pi pi-lock mr-2"></i>
                      {/* <Password placeholder="Password" className="w-full" autoComplete="new-password" /> */}
                      <Password
                        value={value}
                        className="w-full"
                        onChange={(e) => setValue(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <i className="pi pi-lock mr-2"></i>
                      {/* <Password placeholder="Repeat password" className="w-full" autoComplete="new-password" /> */}
                      <Password
                        value={value}
                        className="w-full"
                        onChange={(e) => setValue(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full" label="Create Account" color="success" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
