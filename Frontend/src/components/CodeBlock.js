import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sendCodeUpdate } from '../services/socket';
import '../css/CodeBlock.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessfulSolution from './SuccessfulSolution';

const CodeBlock = (props = {blockData: null, setBlockCode: () => {}, role: null}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const solution = props.blockData.solution;
  const code = props.blockData.code;

  const handleCodeChange =  React.useCallback((value) => {
    props.setBlockCode(value);
    sendCodeUpdate(id, value);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={`code-block ${props.role}`}>
      <h2 className="code-block-title">Welcome to '{props.blockData.title}' block</h2>
      <p className="user-role">Your role: <b>{props.role}</b></p>
      <CodeMirror
          value={code} 
          height = "200px"
          extensions={[javascript({ jsx: true })]}
          onChange={handleCodeChange}
          style={{ textAlign: 'left', minWidth: '50%', border: '1px solid gray'}}
          readOnly = {props.role === 'mentor'}
      />
      <Button variant="outline-primary" className="back-button" onClick={handleBack}>Back to Lobby</Button>
      <SuccessfulSolution code={code} solution={solution}/>
    </div>
  );
};

export default CodeBlock;