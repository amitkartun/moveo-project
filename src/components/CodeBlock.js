import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getCodeBlock } from '../services/api';
import { initiateSocket, disconnectSocket, subscribeToCodeUpdates, sendCodeUpdate, subscribeToRoleAssignment } from '../services/socket';
import '../css/CodeBlock.css';

const CodeBlock = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchCodeBlock = async () => {
      try {
        const block = await getCodeBlock(id);
        setCode(block.code);
      } catch (error) {
        console.error('Error fetching code block:', error);
      }
    };
    fetchCodeBlock();

    initiateSocket(id);
    
    subscribeToRoleAssignment((err, assignedRole) => {
      if (err) return;
      setRole(assignedRole);
    });

    subscribeToCodeUpdates((err, updatedCode) => {
      if (err) return;
      setCode(updatedCode);
    });

    return () => {
      disconnectSocket();
    };
  }, [id]);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
    sendCodeUpdate(id, newCode);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="code-block">
      <h2>Code Block</h2>
      <p>Your role: {role}</p>
      {role === 'mentor' ? (
        <SyntaxHighlighter language="javascript" style={docco} className="syntax-highlighter">
          {code}
        </SyntaxHighlighter>
      ) : (
        <textarea
          value={code}
          onChange={handleCodeChange}
          rows={20}
          cols={80}
        />
      )}
      <button className="back-button" onClick={handleBack}>Back to Lobby</button>
    </div>
  );
};

export default CodeBlock;