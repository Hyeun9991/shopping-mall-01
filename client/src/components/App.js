import { Routes, Route } from 'react-router-dom';
import About from './about/About';
import Home from './home/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
