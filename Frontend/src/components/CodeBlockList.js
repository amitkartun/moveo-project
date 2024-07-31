import React from 'react';
import { Link } from 'react-router-dom';

const CodeBlockList = ({ codeBlocks }) => {
  return (
    <ul className="code-block-list">
      {codeBlocks.map((block) => (
        <li key={block.id}>
          <Link to={`/codeblock/${block.id}`} className="code-block-link" >
            {block.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CodeBlockList;