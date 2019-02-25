import React, {Component} from 'react';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Auxiliary';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef(); // new
    }


    componentDidMount() {
        //this.inputElement.focus(); // old
        this.inputElementRef.current.focus(); // new
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                <AuthContext.Consumer>
                    {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please log in!</p>}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name}, I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    type="text"
                    //ref={(inputEl) => {this.inputElement = inputEl}} // old
                    ref={this.inputElementRef} // new
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </Aux>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes["Person"]);