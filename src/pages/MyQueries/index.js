import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "utils";

const MyQueries = () => {
  const user = useSelector((state) => state.auth.user);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const navigate = useNavigate();

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

  return (
    <div className="Body_body__box__Y49P-">
      <div className="Body_body__wrapper__6cj6C">
        {/* button -> create query */}
        <div className="Navbar_navbar__container__3Q3Zl">
          <div className="sc-jTrPJq gFWlwy">
            <Link to="/create-query">
              <button className="NavButtons_add__button__q_2E5">
                <img
                  src="https://www.zenclass.in/Icons/plus.svg"
                  alt="add/plus"
                />
                Create Query
              </button>
            </Link>
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
        <div className="Body_body__content__1jKgz">
          <div className="Queries_sq__home__cont__2LKRX ">
            {tickets ? (
              <>
                {/* left */}
                <div className="Queries_sq__list__1nUJ9">
                  {tickets?.length
                    ? tickets.map((ticket) => (
                        <div
                          className="Queries_sq__list__item__FVhGh"
                          key={ticket._id}
                          onClick={() => navigate(`/queries/${ticket._id}`)}
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
                            {/* <button className="Buttons_nano__accept__2ILBE">
                          <img
                            src="https://www.zenclass.in/Icons/tick.svg"
                            alt="toggle hide/view"
                          />
                        </button> */}
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="Queries_category__tag__2Znr0">
                              {ticket.category}
                            </span>
                            <span className="Queries_timestamp__1FG2g">
                              {formatDate(ticket.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>

                {/* right */}
                {selectedTicket ? (
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
                        <button
                          className="modal__btn__continue"
                          onClick={() =>
                            navigate(`/queries/${selectedTicket._id}`)
                          }
                        >
                          Go to query
                        </button>
                      </div>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQueries;
