// import Calculator from "../components/Caculator/Caculator";
// import Company from "./Company/Company";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import Nav from "./Nav/Nav";
import Home from "./Examples/Home";
import MyComponent from "./Examples/MyComponent";
import RandomUser from "../components/RandomUser/RandomUser";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/user" component={MyComponent} />
          <Route path="/random" component={RandomUser} />
        </Switch>
        {/* <MyComponent /> */}
        {/* <Calculator defaultA="12" defaultB="10" defaultOperation="+" /> */}
        {/* <RandomUser /> */}
        {/* <Company /> */}
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
