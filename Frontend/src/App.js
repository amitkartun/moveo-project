import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LobbyPage from './components/LobbyPage';
import CodeBlockPage from './components/CodeBlockPage';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './components/NotFoundPage';
import './css/App.css';

function App() {
  return (
    <ErrorBoundary>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LobbyPage />} />
              <Route path="/codeblock/:id" element={<CodeBlockPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
    </ErrorBoundary>
  );
}

export default App;
