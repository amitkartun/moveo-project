import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CodeBlockList.css';

const CodeBlockList = ({ codeBlocks }) => {
  return (
    <ListGroup as="ul" className="code-block-list">
      {codeBlocks.map((block) => (
        <ListGroup.Item
          as="li"
          key={block._id}
          className="code-block-item"
        >
          <Link to={`/codeblock/${block._id}`} className="code-block-link">
            {block.title}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CodeBlockList;