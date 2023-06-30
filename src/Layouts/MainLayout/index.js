import { useState } from "react";
import "./MainLayout.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "store/actions";

const MainLayout = ({ title, children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div>
      {/* header */}
      <nav className="header__cont flex-y">
        <h1 className="heading">{title}</h1>

        <div className="lastContents">
          <h5 className="mt-3 mr-3 px-3">{user.name}</h5>
          <div className="flex-icons">
            <div className="d-flex align-items-center justify-content-center dropdown">
              <span
                data-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setOpenPopover((prevState) => !prevState)}
              >
                <img
                  src="https://www.zenclass.in/static/media/user.8d49e377.png"
                  alt=""
                  className="profileIcon"
                  width="46"
                />
              </span>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="false"
                className={`dropdownMenu dropdown-menu  dropdown-custom ${
                  openPopover ? "show" : "hide"
                }`}
                x-placement="bottom-start"
              >
                {/* <button
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdownItem dropdown-item"
                >
                  Profile
                </button> */}
                <button
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdownItem dropdown-item"
                  onClick={() => dispatch(logoutAction())}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default MainLayout;
