import { useEffect, useState } from "react";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "store/actions";
import api from "axiosConfig";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openPopover, setOpenPopover] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get("/api/tickets/getUserTickets", {
          headers: {
            Authorization: `Bearer ${user.token}`, // Replace `token` with your actual token variable
          },
        });
        setTickets(response.data.tickets);
        setSelectedTicket(response.data.tickets[0]);
      } catch (error) {
        console.error("catch", error.response.data);
      }
    };
    fetchTicket();
  }, [user.token]);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const convertedDate = date.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return convertedDate;
  };

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
      <div className="Body_body__box__Y49P-">
        <div className="Body_body__wrapper__6cj6C">
          {/* button -> create query */}
          <div className="Navbar_navbar__container__3Q3Zl">
            <div className="sc-jTrPJq gFWlwy">
              <button className="NavButtons_add__button__q_2E5">
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
                className="Search_search__box__1WtVJ"
              />
            </div>
          </div>

          {/*  */}

          <div className="Body_body__content__1jKgz">
            <div className="Queries_sq__home__cont__2LKRX ">
              {/* left */}
              <div className="Queries_sq__list__1nUJ9">
                {tickets?.length &&
                  tickets.map((ticket) => (
                    <div
                      className="Queries_sq__list__item__FVhGh"
                      key={ticket._id}
                    >
                      <div className="Queries_sq__list__tile__head__169P7">
                        <span className="Queries_sq__tile__title__357Tm">
                          {ticket.title}
                        </span>
                        <div className="Queries_query__status__btn__cont__1Gdq0">
                          <div className="Queries_query__status__btn__mKjvg Queries_query__status__unassigned__2I66S">
                            {ticket.status}
                          </div>
                        </div>
                        <button className="Buttons_nano__accept__2ILBE">
                          <img
                            src="https://www.zenclass.in/Icons/tick.svg"
                            alt="toggle hide/view"
                          />
                        </button>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="Queries_category__tag__2Znr0">
                          {ticket.description}
                        </span>
                        <span className="Queries_timestamp__1FG2g">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* right */}
              {selectedTicket && (
                <div className="Queries_sq__single__item__3QDru">
                  <span className="Queries_recent__title___0YjV">
                    Recent query
                  </span>
                  <span>
                    <span className="Queries_sq__title__border__3EQUd">
                      <span className="Queries_sq__tile__title__357Tm">
                        {selectedTicket.title}
                      </span>
                      <div className="Queries_query__status__btn__cont__1Gdq0">
                        <div className="Queries_query__status__btn__mKjvg Queries_query__status__unassigned__2I66S">
                          {selectedTicket.status}
                        </div>
                      </div>
                    </span>
                    <div className="Queries_queries__data__rowFlex__K0khZ">
                      <div className="Queries_queries__studCont__3fLlU">
                        <span className="Queries_query__grey__text__8FJZa">
                          Created at:
                        </span>
                        <span>{formatDate(selectedTicket.createdAt)}</span>
                      </div>
                      <div className="Queries_queries__studCont__3fLlU">
                        <span className="Queries_query__grey__text__8FJZa">
                          Assigned to:
                        </span>
                        <span>-</span>
                      </div>
                      <div className="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94">
                        <span className="Queries_query__grey__text__8FJZa">
                          Description:
                        </span>
                        <span>{selectedTicket.description}</span>
                      </div>
                    </div>
                    <div className="Queries_go__to__btn__iNgHn">
                      <button className="modal__btn__continue">
                        Go to query
                      </button>
                    </div>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
