import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import "./App.css";
import "./responsive.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.part} element={<Page />} />;
        })}
      </Routes>
    </>
  );
}

export default App;
