import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const perPage = 11;
  const [todos, setTodos] = useState([]);
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(perPage);
  const [totalPages, setTotalPages] = useState(1);
  const pagination = (page) => {
    console.log(page);
    const startRec = perPage * (page - 1);
    const endRec = startRec + perPage;
    setStartPage(startRec);
    setEndPage(endRec);
    console.log(startRec);
    console.log(endRec);
  };
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setTodos(res.data);
      console.log(res.data);
      const totalPage = Math.ceil(res.data.length / perPage);
      setTotalPages(totalPage);
    });
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>
        {todos &&
          todos.slice(startPage, endPage).map((ele) => (
            <div>
              {ele.id} {ele.title}
            </div>
          ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {totalPages > 0 &&
          [...Array(totalPages).keys()].map((ele) => {
            const page = ele + 1;
            return (
              <div>
                <button
                  style={{
                    cursor: "pointer",
                    border: "1px solid black",
                    padding: "5px",
                    width: "150px",
                    height: "50px",
                    borderRadius: "15px 15px",
                  }}
                  onClick={() => pagination(page)}
                >
                  {page}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
