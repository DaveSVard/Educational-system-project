import { BrowserRouter } from "react-router-dom";
import { MyRouter } from "./MyRouter/myRouter";
import "./styles/base.scss"
import "./styles/reset.scss"

function App() {
  return (
    <BrowserRouter>
      <MyRouter/>
    </BrowserRouter>
  );
}

export default App;
