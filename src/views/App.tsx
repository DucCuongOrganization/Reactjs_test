import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RandomUser from "../components/RandomUser/RandomUser";
import "./App.scss";
import NavBar from "./NavBar/NavBar";
import Home from "./Page/Home";
import JobComponent from "./Page/JobComponent";
import ModelForm from "./Page/ModelForm/ModelForm";
import SortableTodoList from "./Page/TodoList/TodoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/jobs" component={JobComponent} />
          <Route path="/random" component={RandomUser} />
          <Route path="/model" component={ModelForm} />
          <Route path="/todo-list" component={SortableTodoList} />
        </Switch>
      </header>
      <ToastContainer
        autoClose={1000}
        style={{
          minHeight: "40px",
          fontSize: "14px",
        }}
        hideProgressBar
        closeOnClick
        closeButton={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
