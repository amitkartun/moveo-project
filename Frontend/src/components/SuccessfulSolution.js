import React from 'react';

function SuccessfulSolution(props) {
    const solution = props.solution;
    const code = props.code;
    
    if (!solution || !code){
        return null;
    }

    if(solution !== code){
        return null
    }

     return ( 
        <div style={{ fontSize: '48px' }}>😊</div>
    ); 
}

export default SuccessfulSolution;