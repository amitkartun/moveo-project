import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        setIsLoading(true);
        const fetchCodeBlock = async () => {
            try {
                const block = await getCodeBlock(id);
                setBlockData(block);
            } catch (error) {
                setError({error, message: 'Error fetching code block'})
            }
        };

        fetchCodeBlock();

        initiateSocket(id);
    
        subscribeToRoleAssignment((err, assignedRole) => {
            if (err){
                setError({error: err, message: 'Unable setting role'});
            } 
            setRole(assignedRole);  
        });

        subscribeToCodeUpdates((err, updatedCode) => {
            if (err){
                setError({error: err, message: 'Unable updating code'});
            } 
            updateCode(updatedCode);
        });

        setIsLoading(false);

        return () => {
            disconnectSocket();
        };
    }, [id])

    const updateCode = (updatedCode) => {
        setBlockData((prevBlockData) => ({...prevBlockData, code: updatedCode}));
    }

     if (error !== null){
        return (
            <div> 
                <h1>Unable to fetch code block</h1>
                <p>{error.message}</p>
                <Link to="/">Go to Home Page</Link>
            </div>
        );
    }

    if (isLoading || blockData === null || role === null){
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