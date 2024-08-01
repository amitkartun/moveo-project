import React, { useState, useEffect } from 'react';
import CodeBlockList from './CodeBlockList';
import { getAllCodeBlocks } from '../services/api';
import '../css/LobbyPage.css';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CodeBlockPage.css';

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
    return (
      <Spinner animation="border" role="status" className="spinner-code-block">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="lobby-page">
      <h1 className="main-lobby-header">Hello! Welcome my live coding</h1>
      <h2 className="sub-lobby-header">Choose code block:</h2>
      <CodeBlockList codeBlocks={codeBlocks} />
    </div>
  );
};

export default LobbyPage;