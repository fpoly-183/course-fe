import { Button } from 'primereact/button';
import notFoundImg from '../../assets/img/403.png';
import { InputText } from 'primereact/inputtext';

const Page404 = () => {
  return (
    <div className="min-vh-100 flex flex-row align-items-center">
      <div className="container">
        <div className=" flex flex-row justify-content-center">
          <div className="my-auto md:w-5/12">
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">403</h1>
              <h4 className="pt-3">Oops! You{"'"}re not authorized.</h4>
              <p className="text-medium-emphasis float-start">Please contact to Administrator.</p>
            </div>
            <div className="flex items-center">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="pi pi-search"></i>
                  </span>
                </div>
                <InputText type="text" placeholder="What are you looking for?" className="mr-2" />
                <Button className="btn btn-info">Search</Button>
              </div>
            </div>
          </div>
          <div className="my-auto md:w-7/12">
            <img className="w-full" src={notFoundImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
