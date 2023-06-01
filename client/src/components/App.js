import { Routes, Route } from 'react-router-dom';
import About from './about/About';
import Home from './home/Home';
import Login from './RegisterLogin/Login';
import Register from './RegisterLogin/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
