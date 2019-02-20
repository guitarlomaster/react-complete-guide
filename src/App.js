import React, {Component} from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

    state = {
        length: 0,
        string: ''
    };

    changeHandler = (event) => {
        this.setState({
            length: event.target.value.length,
            string: event.target.value
        });
    };

    deleteItemHandler = (index) => {
        const stringArr = this.state.string.split('');
        stringArr.splice(index, 1);
        this.setState({
            length: stringArr.length,
            string: stringArr.join('')
        })
    };

    render() {
        let message = 'Text too short';
        if (this.state.length > 5) {
            message = 'Text long enough';
        }
        let list = null;
        const style = {
            display: 'inline-block',
            padding: '16px',
            textAlign: 'center',
            margin: '16px',
            border: '1px solid black'
        };
        if (this.state.string.length) {
            list = (
                <ul>
                    {this.state.string.split('').map((i, index) => {
                        return (
                            <CharComponent
                                value={i}
                                key={index}
                                click={() => {this.deleteItemHandler(index)}}
                                style={style}
                            />
                        );
                    })}
                </ul>
            )
        }
        return (
            <div className="App">
                <ValidationComponent message={message}/>
                <input type="text" onChange={this.changeHandler} value={this.state.string}/>
                {list}
            </div>
        )
    }

}

export default App;
