import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCodeBlock } from '../services/api';
import CodeBlock from './CodeBlock';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const CodeBlockPage = ({ codeBlocks }) => {

    const { id } = useParams();
    const [blockData, setBlockData] = useState(null);

    useEffect (() => {
        const fetchCodeBlock = async () => {
            try {
            const block = await getCodeBlock(id);
            setBlockData(block);
            } catch (error) {
            console.error('Error fetching code block:', error);
            }
        };
        fetchCodeBlock();
    }, [id])

    if (blockData === null){
        return (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );
    }

  return (
     <CodeBlock initialCode={blockData.code} blockTitle={blockData.title}/>
  );
};

export default CodeBlockPage;