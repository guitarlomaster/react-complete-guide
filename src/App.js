import React, {Component} from 'react';
import classes from './App.module.css';
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
        let persons = null;
        let btnClass = '';
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
                </div>
            );
            btnClass = classes['Red']
        }

        const assignedClasses = [];
        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes['red']);
        }
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes['bold']);
        }

        return (
            <div className={classes['App']}>
                <h1>Hi, I'm a React App!</h1>
                <p className={assignedClasses.join(' ')}>This is really working!</p>
                <button
                    className={btnClass}
                    onClick={this.togglePersonsHandler}
                >
                    Toggle Persons
                </button>
                {persons}
            </div>
        )

    }
}

export default App;
