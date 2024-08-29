import React from 'react';

function LightSequence({ lightSequence }) {
    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', backgroundColor: lightSequence >= 1 ? 'red' : 'grey' }} />
            <div style={{ width: '30px', height: '30px', backgroundColor: lightSequence >= 2 ? 'red' : 'grey' }} />
            <div style={{ width: '30px', height: '30px', backgroundColor: lightSequence >= 3 ? 'red' : 'grey' }} />
            <div style={{ width: '30px', height: '30px', backgroundColor: lightSequence === 4 ? 'green' : 'grey' }} />
        </div>
    );
}

export default LightSequence;
