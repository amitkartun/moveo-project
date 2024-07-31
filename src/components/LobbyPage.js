import React, { useState, useEffect } from 'react';
import CodeBlockList from './CodeBlockList';
import { getAllCodeBlocks } from '../services/api';
import '../css/LobbyPage.css';

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        setIsLoading(true);
        const blocks = await getAllCodeBlocks();
        setCodeBlocks(blocks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching code blocks:', error);
        setError('Failed to load code blocks. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchCodeBlocks();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="lobby-page">
      <h1>Choose code block</h1>
      <CodeBlockList codeBlocks={codeBlocks} />
    </div>
  );
};

export default LobbyPage;