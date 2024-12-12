import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <div className="flex items-center  justify-center">
        <div className="container sm:px-0">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
