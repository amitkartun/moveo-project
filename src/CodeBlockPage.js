import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';
import './CodeBlockPage.css';

const socket = io('http://localhost:5000'); 

const CodeBlockPage = () => {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const [codeBlock, setCodeBlock] = useState({});
  const [isMentor, setIsMentor] = useState(false);
  const [code, setCode] = useState('');
  const [isSolution, setIsSolution] = useState(false);

  useEffect(() => {
    // Fetch the code block by ID from the backend
    const fetchCodeBlock = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/codeblocks/${blockId}`); 
        const block = await response.json();
        setCodeBlock(block);
        setCode(block.code);
      } catch (error) {
        console.error('Error fetching code block:', error);
      }
    };

    fetchCodeBlock();

    // Determine role from session storage
    const role = sessionStorage.getItem('role');
    setIsMentor(role === 'mentor');

    // Join socket room
    socket.emit('join', blockId);

    // Handle real-time code updates
    socket.on('codeChange', (newCode) => {
      setCode(newCode);
      checkSolution(newCode);
    });

    return () => {
      socket.off('codeChange');
    };
  }, [blockId]);

  const handleCodeChange = (editor, data, value) => {
    setCode(value);
    socket.emit('codeChange', value);
    checkSolution(value);
  };

  const checkSolution = (newCode) => {
    setIsSolution(newCode === codeBlock.solution);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="code-block-page">
      <div className="header">
        <h1>{codeBlock.title}</h1>
        <div className="role-indicator">Role: {isMentor ? 'Mentor' : 'Student'}</div>
      </div>
      {isMentor ? (
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
            readOnly: true
          }}
        />
      ) : (
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true
          }}
          onBeforeChange={handleCodeChange}
        />
      )}
      <button className="back-button" onClick={handleBack}>Back to Lobby</button>
      {isSolution && <div className="smiley">😊</div>}
    </div>
  );
};

export default CodeBlockPage;