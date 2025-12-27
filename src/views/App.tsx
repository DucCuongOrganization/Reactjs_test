import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import { NavBar } from "./common/NavBar";
import { ScrollToTop } from "./common/ScrollToTop";
import Home from "./Page/Home/Home";
import TodoDetail from "./Page/TodoDetail/TodoDetail";
import TodoList from "./Page/TodoList/TodoList";

const { Sider, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ScrollToTop />
      <Sider
        width={250}
        style={{
          background: "#fff",
          boxShadow: "2px 0 8px 0 rgba(29, 35, 41, 0.05)",
        }}
      >
        <NavBar />
      </Sider>
      <Content
        style={{
          background: "#f0f2f5",
          overflowY: "auto",
        }}
      >
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/todo-list" component={TodoList} exact />
          <Route path="/todo-create" component={TodoDetail} exact />
          <Route path="/todo-edit/:id" component={TodoDetail} exact />
          <Route path="/todo/:id" component={TodoDetail} exact />
        </Switch>
      </Content>
    </Layout>
  );
}

export default App;
