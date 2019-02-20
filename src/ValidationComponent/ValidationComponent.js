import React from 'react';

const validationComponent = (props) => {
    return (
        <div className="ValidationComponent">
            <p>{props.message}</p>
        </div>
    );
};

export default validationComponent;