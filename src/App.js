import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LobbyPage from './components/LobbyPage';
import CodeBlock from './components/CodeBlock';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="/codeblock/:id" element={<CodeBlock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
