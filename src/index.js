import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/Form";
import Search from "./components/Search";

const Index = () => {
  return (
        <React.Fragment>
            <div>
                Hello React!
            </div>
            <h1>abdelrahman</h1>
            <Form/>
            <Search/>
        </React.Fragment>
    );
};

ReactDOM.render(<Index />, document.getElementById("index"));