import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RandomUser from "../components/RandomUser/RandomUser";
import "./App.scss";
import Home from "./Examples/Home";
import JobComponent from "./Examples/JobComponent";
import ModelForm from "./Examples/ModelForm";
import Nav from "./Nav/Nav";
import DetailUser from "./Users/DetailUser";
import ListUsers from "./Users/ListUsers";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/job" component={JobComponent} />
          <Route path="/random" component={RandomUser} />
          <Route path="/users" component={ListUsers} exact />
          <Route path="/users/:id" component={DetailUser} />
          <Route path="/model" component={ModelForm} />
        </Switch>
      </header>
      <ToastContainer
        autoClose={1000}
        toastStyle={{
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
