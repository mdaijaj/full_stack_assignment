import React, { useEffect, useState } from "react";
import '../App.css';
import Table from "./table";

const TableData = (props) => {
  console.log("aijajkhan", props)
  const [query, setQuery] = useState("");
  const keys = ["first", "last", "email", "phone", "city", "state"];

  const search = (data) => {
    console.log("data", data)
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };


  return (
    <>
    <h1>Show Table data list</h1>
    <input
      className="search" style={{margin: "35px 0px 35px"}}
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value.toLowerCase())}
    />
  {/* <Table data={search(props.products)}/> */}
  </>
  );
  };

export default TableData;