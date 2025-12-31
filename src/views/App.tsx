import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import { NavBar } from "./common/NavBar";
import { ScrollToTop } from "./common/ScrollToTop";
import Home from "./Page/Home/Home";
import TarotAR from "./Page/Tarot/TarotAR";
import TodoDetail from "./Page/TodoDetail/TodoDetail";
import TodoList from "./Page/TodoList/TodoList";

const { Sider, Content } = Layout;

function App() {
  return (
    <Layout className="app-layout">
      <ScrollToTop />
      <Sider width={250} className="app-sider">
        <NavBar />
      </Sider>
      <Content className="app-content">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/todo-list" component={TodoList} exact />
          <Route path="/todo-create" component={TodoDetail} exact />
          <Route path="/todo-edit/:id" component={TodoDetail} exact />
          <Route path="/todo/:id" component={TodoDetail} exact />
          <Route path="/tarot" component={TarotAR} exact />
        </Switch>
      </Content>
    </Layout>
  );
}

export default App;
