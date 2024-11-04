import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GestaoImagem from './views/GestaoImagem.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<GestaoImagem />} />
      </Routes>
    </Router>
  );
}

export default App;
