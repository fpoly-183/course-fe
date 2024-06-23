import TheAside from './TheAside';
import TheContent from './TheContent';
import TheHeader from './TheHeader';
import TheSidebar from './TheSidebar';

const TheLayout = () => {
  return (
    <div className="flex">
      <div className="w-[15%] z-[999] h-screen bg-white shadow-lg dark:bg-gray-800 dark:text-white">
        <TheSidebar />
        <TheAside />
      </div>
      <div className="w-[85%] bg-light dark:bg-gray-900 bg-[#eff3f8]">
        <TheHeader />
        <div className=" px-5">
          <TheContent />
        </div>
        {/* <TheFooter /> */}
      </div>
    </div>
  );
};
export default TheLayout;
