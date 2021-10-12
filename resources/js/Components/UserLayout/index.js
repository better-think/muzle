import React from "react";
import clsx from "clsx";
import NavList from "./NavList";
import UserMenu from "./UserMenu";

const UserLayout = ({ children }) => {

  const [mobileMenu, setMobileMenu] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setMobileMenu(false);
      }
    });
  }, [setMobileMenu]);

  return (
    <div className={clsx('flex h-screen bg-gray-50 transition-transform md:transition-none transform', { 'translate-x-64': mobileMenu })}>
      <div className="flex flex-col flex-1 w-full">
        <header className="z-10 h-16 bg-yellow-900 text-white shadow1 px-2 lg:px-0">
          <div className="container max-w-screen-lg mx-auto flex items-center h-full">
            <a className="h-full flex items-center" href="/">
              <img className="h-8" src="/img/logo-white.png" alt="" />
            </a>
            <div className="pl-8 space-x-2 h-full flex">
              <a
                href='/games'
                className="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800"
              >
                Digitālās spēles
              </a>
              <a
                href='/'
                className="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800"
              >
                Koka spēles
              </a>
              <a
                href='/'
                className="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800"
              >
                Kontakti
              </a>
            </div>
            <div className="flex-grow"></div>
            <UserMenu />
          </div>
        </header>
        <main className="h-full overflow-y-auto px-2 lg:px-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;