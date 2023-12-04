import { Outlet } from "react-router-dom";
import Navbar from "../../components/others/navbar/Navbar";
import { ContextWraper } from "../../components/wraper/ContextWraper";
import { useLayoutEffect } from "react";
import { getAll } from "../../services/api/axios/axios";

export default function LayoutMain() {
  useLayoutEffect(() => {
    getAll();
  }, []);
  return (
    <>
      <ContextWraper>
        <nav className="w-full flex justify-center">
          {/* Nav bar component here */}
          <Navbar />
        </nav>

        <main className="w-full flex flex-col justify-center items-center">
          <Outlet />
        </main>

        <footer>
          {/* Footer componentes here */}
          <footer className="w-full flex justify-center items-center px-4 py-8 bg-gray-800 text-gray-400">
            <div className="sm:block lg:flex gap-8">
              <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
                <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
              <ul className="sm:mt-4 lg:mt-[0px] flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Instagram
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Facebook
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </footer>
      </ContextWraper>
    </>
  );
}
