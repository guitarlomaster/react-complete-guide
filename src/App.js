import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

    state = {
        persons: [
            {id: 'qwe12', name: 'Max', age: 28},
            {id: 'das23', name: 'Manu', age: 29},
            {id: 'vew32', name: 'Stephanie', age: 26}
        ],
        hobbies: 'My Hobbies: Racing',
        showPersons: false
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        //const person = Object.assign({}, this.state.persons[personIndex]);
        const person = {...this.state.persons[personIndex]};
        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;
        this.setState({persons:persons});
    };

    deletePersonHandler = (personIndex) => {
        //const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({
            showPersons: !doesShow
        })
    };

    render() {
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            outline: 'none'
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return (
                            <Person
                                name={person.name}
                                age={person.age}
                                click={this.deletePersonHandler.bind(this, index)}
                                key={person.id}
                                changed={(event) => this.nameChangedHandler(event, person.id)}
                            />
                        );
                    })}
                   {/* <Person
                        name={this.state.persons[0].name}
                        age={this.state.persons[0].age}
                    />
                    <Person
                        name={this.state.persons[1].name}
                        age={this.state.persons[1].age}
                        click={this.switchNameHandler.bind(this, 'Max!')}
                        changed={this.nameChangedHandler}
                    >
                        {this.state.hobbies}
                    </Person>
                    <Person
                        name={this.state.persons[2].name}
                        age={this.state.persons[2].age}
                    />*/}
                </div>
            );
        }

        return (
            <div className="App">
                <h1>Hi i am a react app!</h1>
                <button
                    style={style}
                    onClick={this.togglePersonsHandler}
                >
                    Switch Name
                </button>
                {persons}
            </div>
        )
    }
}

export default App;
