import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { sendCodeUpdate } from '../services/socket';
import '../css/CodeBlock.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const CodeBlock = (props = {blockData: null, setBlockCode: () => {}, role: null}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    props.setBlockCode(newCode);
    sendCodeUpdate(id, newCode);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="code-block">
      <h2 className="code-block-title">Welcome to '{props.blockData.title}' block</h2>
      <p className="user-role">Your role: <b>{props.role}</b></p>
      {props.role === 'mentor' ? (
        <SyntaxHighlighter language="javascript" style={docco} className="syntax-highlighter">
          {props.blockData.code}
        </SyntaxHighlighter>
      ) : (
        <textarea
          value={props.blockData.code}
          onChange={handleCodeChange}
          rows={20}
          cols={80}
        />
      )}
      <Button variant="outline-primary" className="back-button" onClick={handleBack}>Back to Lobby</Button>
    </div>
  );
};

export default CodeBlock;