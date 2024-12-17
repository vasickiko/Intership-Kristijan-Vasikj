import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <div className="app app--centered">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
