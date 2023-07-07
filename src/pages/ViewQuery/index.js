import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SocketContext } from "context/socketContext";
import { useSelector } from "react-redux";
import "./viewQuery.css";
import api from "axiosConfig";
import { formatDate } from "utils";
import Dropdown from "react-bootstrap/Dropdown";

const Query = () => {
  const socket = useContext(SocketContext);
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/api/tickets/getTicket/${params.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Replace `token` with your actual token variable
          },
        });
        setTickets(response?.data);
      } catch (error) {
        console.error("catch", error.response.data);
      }
    };
    fetchTicket();
  }, [user.token]);

  const ticketAssignUpdate = async () => {
    try {
      const response = await api.put(
        `/api/tickets/${params.id}/assign`,
        { assign: user?.name },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Replace `token` with your actual token variable
          },
        }
      );
      setTickets(response?.data);
    } catch (error) {
      console.error("catch", error.response.data);
    }
  };
  const ticketStatusUpdate = async () => {
    try {
      const response = await api.put(
        `/api/tickets/${params.id}/status`,
        { status: tickets[0]?.status === "Open" ? "Closed" : "Open" },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Replace `token` with your actual token variable
          },
        }
      );
      setTickets(response?.data);
    } catch (error) {
      console.error("catch", error.response.data);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.emit("chat", {
      ticketId: params.id,
      token: user.token,
      sender: user.name,
      content: user.content,
    });
    socket.on("newMessage", (updatedMessages) => {
      setMessages(updatedMessages);
    });
    socket.on("updatedMessage", (updatedMessages) => {
      setMessages(updatedMessages);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendChat", {
      ticketId: params.id,
      sender: user.name,
      content: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="Body_body__box__Y49P-">
      <div className="Body_body__wrapper__6cj6C">
        {/* button -> create query */}
        <div className="Navbar_navbar__container__3Q3Zl">
          <div className="sc-jTrPJq gFWlwy">
            <Link to="/queries">
              <button className="NavButtons_add__button__q_2E5">
                <img
                  src="https://www.zenclass.in/Icons/backArrow.svg"
                  alt="add/plus"
                />
                Back
              </button>
            </Link>
          </div>
        </div>
        {/*  */}
        <div className="Body_body__content__1jKgz">
          <div className="Queries_query__cont__15HCC">
            {/* left */}
            <div className="Queries_sq__chat__1Q7Yx">
              <div className="Queries_queries__chat__topBar__yH4Tz">
                {user?.isAdmin ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Actions{" "}
                    </Dropdown.Toggle>
                    {tickets[0]?.status === "Open" ? (
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => ticketStatusUpdate()}>
                          Drop
                        </Dropdown.Item>
                        {user?.name !== tickets[0]?.assign && (
                          <Dropdown.Item onClick={() => ticketAssignUpdate()}>
                            Take up
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    ) : (
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => ticketStatusUpdate()}>
                          Reopen
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                ) : (
                  ""
                )}
                <>
                  <div
                    className="Queries_query__status__btn__cont__1Gdq0"
                    // style="cursor: pointer;"
                  >
                    <div className="Queries_query__status__btn__mKjvg Queries_query__status__unassigned__2I66S">
                      {!tickets[0]?.assign ? "Unassigned" : "Assigned"}
                    </div>
                  </div>
                  {/* <button
                      className="Buttons_colorBtn__2m514"
                      // style="border: 1px solid rgb(6, 170, 68); color: rgb(6, 170, 68); position: relative;"
                    >
                      Appeal Solved
                    </button> */}
                </>
              </div>
              <div className="Queries_queries__chat__logs__OSzGU">
                {messages.length ? (
                  <>
                    {messages.map((msg) => {
                      if (msg.sender === user.name) {
                        return (
                          <div
                            className="Queries_chat__item__3AnjF"
                            key={msg._id}
                          >
                            <span>
                              <img
                                src="https://www.zenclass.in/images/userIcon.svg"
                                alt="user"
                              />
                            </span>
                            <div className="Queries_chat__content__left__1Breq">
                              <span>{msg.content}</span>
                              <div className="Queries_time__data__chat__2p4yq">
                                {formatDate(msg.timestamp)}
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="Queries_chat__item__3AnjF"
                            key={msg._id}
                          >
                            <div className="Queries_chat__content__right__1a6MY">
                              <span>{msg.content}</span>
                              <div className="Queries_time__data__chat__2p4yq">
                                {formatDate(msg.timestamp)}
                              </div>
                              <span>
                                <img
                                  src="https://www.zenclass.in/images/userIcon.svg"
                                  alt="user"
                                />
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : (
                  <div className="Queries_chat__cont__unassigned__eQFIS">
                    <p
                    // style="font-size: 1rem;"
                    >
                      This query isn't taken up by the mentor yet.
                    </p>
                    <img
                      src="https://www.zenclass.in/images/unassigned_query.svg"
                      alt="unassigned"
                    />
                  </div>
                )}
              </div>
              <div className="Queries_queries__chat__actionBar__3yK2_">
                <div className="Queries_attachment__cont__3kg56">
                  <img
                    src="https://www.zenclass.in/Icons/attachment.svg"
                    alt="attachment button"
                  />
                </div>
                <div className="Queries_chat__input__cont__NH4sz">
                  <input
                    type="text"
                    className="Queries_chat__input__28_gq"
                    name="message"
                    placeholder="Send a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <img
                    src="https://www.zenclass.in/Icons/send.svg"
                    alt="message send icon"
                    className="Queries_send__icon__1ftsf"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
            {/* right */}

            {tickets.length ? (
              <div className="Queries_sq__data__14X3m">
                <div className="Queries_queries__data__title__1mVyD">
                  <span>{tickets[0].description}</span>
                </div>
                <div className="Queries_queries__data__rowFlex__K0khZ">
                  <div className="Queries_queries__studCont__3fLlU">
                    <span className="Queries_query__grey__text__8FJZa">
                      Created at:
                    </span>
                    <span>{formatDate(tickets[0].createdAt)}</span>
                  </div>
                  <div className="Queries_queries__studCont__3fLlU">
                    <span className="Queries_query__grey__text__8FJZa">
                      Assigned to:
                    </span>
                    <span>
                      {" "}
                      {!tickets[0]?.assign
                        ? "Unassigned"
                        : `Assigned to ${tickets[0].assign}`}
                    </span>
                  </div>
                  <div className="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94">
                    <span className="Queries_query__grey__text__8FJZa">
                      Description:
                    </span>
                    <span>{tickets[0].description}</span>
                  </div>
                  <div className="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94">
                    <span className="Queries_query__grey__text__8FJZa">
                      Tags:
                    </span>
                    <div className="Queries_query__tags__wrap__IzES2">
                      <span className="Queries_query__tags__bqDS5">react</span>
                    </div>
                  </div>
                  <div className="Queries_queries__studCont__3fLlU">
                    <span className="Queries_query__grey__text__8FJZa">
                      Category:
                    </span>
                    <span>{tickets[0].category}</span>
                  </div>
                  <div className="Queries_queries__studCont__3fLlU">
                    <span className="Queries_query__grey__text__8FJZa">
                      Sub-Category:
                    </span>
                    <span>Task</span>
                  </div>
                  <div className="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94">
                    <span className="Queries_query__grey__text__8FJZa">
                      Preferred Language:
                    </span>
                    <div className="Queries_query__tags__wrap__IzES2">
                      {tickets[0].selectLanguage}
                    </div>
                  </div>
                  <div className="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94"></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Query;
