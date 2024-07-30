import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Lobby.css';

const Lobby = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    // Fetch code blocks from the backend
    const fetchCodeBlocks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/codeblocks');
        const data = await response.json();
        setCodeBlocks(data);
      } catch (error) {
        console.error('Error fetching code blocks:', error);
      }
    };

    fetchCodeBlocks();
  }, []);

  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map(block => (
          <li key={block.id}>
            <Link to={`/codeblock/${block.id}`} className="code-block-link">{block.title}</Link>
          </li>
        ))}
        <li>
          <Link to="/test-highlight" className="code-block-link">Test Highlighting</Link>
        </li>
      </ul>
    </div>
  );
};

export default Lobby;
