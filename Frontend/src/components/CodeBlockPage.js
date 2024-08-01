import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCodeBlock } from '../services/api';
import CodeBlock from './CodeBlock';
import { initiateSocket, subscribeToRoleAssignment, subscribeToCodeUpdates, disconnectSocket } from '../services/socket';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CodeBlockPage.css';

const CodeBlockPage = () => {

    const { id } = useParams();
    const [blockData, setBlockData] = useState(null);
    const [role, setRole] = useState(null);

    useEffect (() => {
        const fetchCodeBlock = async () => {
            try {
            const block = await getCodeBlock(id);
            setBlockData(block);
            } catch (error) {
            // TODO: Handle error!
            console.error('Error fetching code block:', error);
            }
        };

        fetchCodeBlock();

        initiateSocket(id);
    
        subscribeToRoleAssignment((err, assignedRole) => {
            // TODO: Handle error!
            if (err) return;
            setRole(assignedRole);  
        });

        subscribeToCodeUpdates((err, updatedCode) => {
            // TODO: Handle error!
            if (err) return;
            updateCode(updatedCode);
        });

        return () => {
            disconnectSocket();
        };
    }, [id])

    const updateCode = (updatedCode) => {
        setBlockData((prevBlockData) => ({...prevBlockData, code: updatedCode}));
    }

    if (blockData === null || role === null){
        return (
            <Spinner animation="border" role="status" className="spinner-code-block">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );
    }

  return (
     <CodeBlock blockData={blockData} setBlockCode={updateCode} role={role}/>
  );
};

export default CodeBlockPage;