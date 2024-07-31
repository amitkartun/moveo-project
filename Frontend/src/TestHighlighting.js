import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const TestHighlighting = () => {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, []);

  return (
    <div>
      <h1>Test Highlighting</h1>
      <pre>
        <code className="javascript">
          {`function test() {
  console.log('Test syntax highlighting!');
}`}
        </code>
      </pre>
    </div>
  );
};

export default TestHighlighting;