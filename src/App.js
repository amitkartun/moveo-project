// // import logo from './logo.svg';
// import './App.css';

// const App = () => {
//   return (
//     <div className="App">
//       <h1>Online Coding App</h1>
//     </div>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lobby from './Lobby';
//import CodeBlockPage from './CodeBlockPage';
import TestHighlighting from './TestHighlighting'; // Import the test component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        {/* <Route path="/codeblock/:blockId" element={<CodeBlockPage />} /> */}
        <Route path="/test-highlight" element={<TestHighlighting />} /> {/* Test route */}
      </Routes>
    </Router>
  );
};

export default App;

