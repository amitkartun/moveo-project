import React from 'react';
import { Link } from 'react-router-dom';

const CodeBlockList = ({ codeBlocks }) => {
  return (
    <ul className="code-block-list">
      {codeBlocks.map((block) => (
        <li key={block._id}>
          <Link to={`/codeblock/${block._id}`} className="code-block-link" >
            {block.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CodeBlockList;