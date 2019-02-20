import React from 'react';

const charComponent = (props) => {
    return <li style={props.style} onClick={props.click}>{props.value}</li>
};

export default charComponent;