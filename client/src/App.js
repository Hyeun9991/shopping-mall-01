import { Routes, Route } from 'react-router-dom';
import Home from './components/views/home/Home';
import Login from './components/RegisterLogin/Login';
import Register from './components/RegisterLogin/Register';
import { ThemeProvider } from './context/themeProvider';
import { GlobalStyle } from './theme/GlobalStyle';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
