import { useState } from "react";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "store/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div>
      {/* header */}
      <nav className="header__cont flex-y">
        <h1 className="heading">My Queries</h1>

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
                tabindex="-1"
                role="menu"
                aria-hidden="false"
                className={`dropdownMenu dropdown-menu  dropdown-custom ${
                  openPopover ? "show" : "hide"
                }`}
                x-placement="bottom-start"
              >
                {/* <button
                  type="button"
                  tabindex="0"
                  role="menuitem"
                  class="dropdownItem dropdown-item"
                >
                  Profile
                </button> */}
                <button
                  type="button"
                  tabindex="0"
                  role="menuitem"
                  class="dropdownItem dropdown-item"
                  onClick={() => dispatch(logoutAction())}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="Body_body__box__Y49P-">
        <div class="Body_body__wrapper__6cj6C">
          {/* button -> create query */}
          <div class="Navbar_navbar__container__3Q3Zl">
            <div class="sc-jTrPJq gFWlwy">
              <button class="NavButtons_add__button__q_2E5">
                <img
                  src="https://www.zenclass.in/Icons/plus.svg"
                  alt="add/plus"
                />
                Create Query
              </button>
            </div>
            {/* search */}
            <div>
              <input
                type="text"
                name="searchBox"
                class="Search_search__box__1WtVJ"
                value=""
              />
            </div>
          </div>

          {/*  */}

          <div class="Body_body__content__1jKgz">
            <div class="Queries_sq__home__cont__2LKRX ">
              {/* left */}
              <div class="Queries_sq__list__1nUJ9">
                <div class="Queries_sq__list__item__FVhGh">
                  <div class="Queries_sq__list__tile__head__169P7">
                    <span class="Queries_sq__tile__title__357Tm">
                      QN41659 - doubt on capstone project
                    </span>
                    <div class="Queries_query__status__btn__cont__1Gdq0">
                      <div class="Queries_query__status__btn__mKjvg Queries_query__status__unassigned__2I66S">
                        Unassigned
                      </div>
                    </div>
                    <button class="Buttons_nano__accept__2ILBE">
                      <img
                        src="https://www.zenclass.in/Icons/tick.svg"
                        alt="toggle hide/view"
                      />
                    </button>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="Queries_category__tag__2Znr0">
                      Zen-Class Doubt
                    </span>
                    <span class="Queries_timestamp__1FG2g">
                      23/06/2023, 12:04 PM
                    </span>
                  </div>
                </div>
              </div>
              {/* right */}
              <div class="Queries_sq__single__item__3QDru">
                <span class="Queries_recent__title___0YjV">Recent query</span>
                <span>
                  <span class="Queries_sq__title__border__3EQUd">
                    <span class="Queries_sq__tile__title__357Tm">
                      QN41659 - doubt on capstone project
                    </span>
                    <div class="Queries_query__status__btn__cont__1Gdq0">
                      <div class="Queries_query__status__btn__mKjvg Queries_query__status__unassigned__2I66S">
                        Unassigned
                      </div>
                    </div>
                  </span>
                  <div class="Queries_queries__data__rowFlex__K0khZ">
                    <div class="Queries_queries__studCont__3fLlU">
                      <span class="Queries_query__grey__text__8FJZa">
                        Created at:
                      </span>
                      <span>23/06/2023, 12:04 PM</span>
                    </div>
                    <div class="Queries_queries__studCont__3fLlU">
                      <span class="Queries_query__grey__text__8FJZa">
                        Assigned to:
                      </span>
                      <span>-</span>
                    </div>
                    <div class="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94">
                      <span class="Queries_query__grey__text__8FJZa">
                        Description:
                      </span>
                      <span>doubt on capstone project</span>
                    </div>
                  </div>
                  <div class="Queries_go__to__btn__iNgHn">
                    <button class="modal__btn__continue">Go to query</button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
