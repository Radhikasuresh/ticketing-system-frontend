import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SocketContext } from "context/socketContext";
import { useSelector } from "react-redux";
import "./viewQuery.css";

const Query = () => {
  const socket = useContext(SocketContext);
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [tickets, setTickets] = useState([]);

  // useEffect(() => {
  //   const fetchTicket = async () => {
  //     try {
  //       const response = await api.get("/api/tickets/getTicket", {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`, // Replace `token` with your actual token variable
  //         },
  //       });
  //       setTickets(response.data.tickets);
  //       setSelectedTicket(response.data.tickets[0]);
  //     } catch (error) {
  //       console.error("catch", error.response.data);
  //     }
  //   };
  //   fetchTicket();
  // }, [user.token]);

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

  console.log("METADATA", messages);

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
        <div class="Body_body__content__1jKgz">
          <div class="Queries_query__cont__15HCC">
            {/* left */}
            <div class="Queries_sq__chat__1Q7Yx">
              <div class="Queries_queries__chat__topBar__yH4Tz">
                <div
                  class="Queries_query__status__btn__cont__1Gdq0"
                  // style="cursor: pointer;"
                >
                  <div class="Queries_query__status__btn__mKjvg Queries_query__status__unassigned__2I66S">
                    Unassigned
                  </div>
                </div>
                <button
                  class="Buttons_colorBtn__2m514"
                  // style="border: 1px solid rgb(6, 170, 68); color: rgb(6, 170, 68); position: relative;"
                >
                  Appeal Solved
                </button>
              </div>
              <div class="Queries_queries__chat__logs__OSzGU">
                {messages.length ? (
                  <>
                    {messages.map((msg) => {
                      if (msg.sender === "venky") {
                        return (
                          <>
                            {/* left */}
                            <div class="Queries_chat__item__3AnjF">
                              <span>
                                <img
                                  src="https://www.zenclass.in/images/userIcon.svg"
                                  alt="user"
                                />
                              </span>
                              <div class="Queries_chat__content__left__1Breq">
                                <span>{msg.content}</span>
                                <div class="Queries_time__data__chat__2p4yq">
                                  Mar 27, 12:42 PM
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            {/* right */}
                            <div class="Queries_chat__item__3AnjF">
                              <div class="Queries_chat__content__right__1a6MY">
                                <span>{msg.content}</span>
                                <div class="Queries_time__data__chat__2p4yq">
                                  Mar 27, 12:43 PM
                                </div>
                                <span>
                                  <img
                                    src="https://www.zenclass.in/images/userIcon.svg"
                                    alt="user"
                                  />
                                </span>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </>
                ) : (
                  <div class="Queries_chat__cont__unassigned__eQFIS">
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
              <div class="Queries_queries__chat__actionBar__3yK2_ Queries_actionBar__disable__2d0Al">
                <div class="Queries_attachment__cont__3kg56">
                  <img
                    src="https://www.zenclass.in/Icons/attachment.svg"
                    alt="attachment button"
                  />
                </div>
                <div class="Queries_chat__input__cont__NH4sz">
                  <input
                    type="text"
                    class="Queries_chat__input__28_gq"
                    name="message"
                    placeholder="Send a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <img
                    src="https://www.zenclass.in/Icons/send.svg"
                    alt="message send icon"
                    class="Queries_send__icon__1ftsf"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
            {/* right */}

            <div class="Queries_sq__data__14X3m">
              <button onClick={handleSubmit}>send</button>
              <div class="Queries_queries__data__title__1mVyD">
                <span>QN41659 - doubt on capstone project</span>
              </div>
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
                <div class="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94">
                  <span class="Queries_query__grey__text__8FJZa">Tags:</span>
                  <div class="Queries_query__tags__wrap__IzES2">
                    <span class="Queries_query__tags__bqDS5">react</span>
                  </div>
                </div>
                <div class="Queries_queries__studCont__3fLlU">
                  <span class="Queries_query__grey__text__8FJZa">
                    Category:
                  </span>
                  <span>Zen-Class Doubt</span>
                </div>
                <div class="Queries_queries__studCont__3fLlU">
                  <span class="Queries_query__grey__text__8FJZa">
                    Sub-Category:
                  </span>
                  <span>Task</span>
                </div>
                <div class="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94">
                  <span class="Queries_query__grey__text__8FJZa">
                    Preferred Language:
                  </span>
                  <div class="Queries_query__tags__wrap__IzES2">Tamil</div>
                </div>
                <div class="Queries_queries__studCont__3fLlU Queries_grid__col2__3UV94"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Query;
