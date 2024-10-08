// import logo from "./logo.svg";
import MyComponent from "./Examples/MyComponent";
// import Calculator from "../components/Caculator/Caculator";
// import Company from "./Company/Company";
// import RandomUser from "../components/RandomUser/RandomUser";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <MyComponent />
        {/* <Calculator defaultA="12" defaultB="10" defaultOperation="+" /> */}
        {/* <RandomUser /> */}
        {/* <Company /> */}
      </header>
    </div>
  );
}

export default App;
