import React, { Component } from 'react';
import Search from '../search';
import Header from '../header';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';


class App extends Component {
    maxId = 100;

    constructor() {
        super();
        this.state = {
            todos: [
                this.createTodoItem('Drink coffee'),
                this.createTodoItem('Create awesome app'),
                this.createTodoItem('Have a lunch'),
                this.createTodoItem('Read book')
            ],
            term: '',
            filter: 'all'
        }
    }

    createTodoItem(label) {
        return { label, done: false, important: false, id: this.maxId++ };
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }

    deleteItem = (id) => {
        this.setState(({ todos }) => {
            const idx = todos.findIndex((el) => el.id === id);
            return {
                todos: [...todos.slice(0, idx), ...todos.slice(idx + 1)]
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todos }) => {
            return {
                todos: [...todos, newItem]
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ todos }) => {
            return {
                todos: this.toggleProperty(todos, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todos }) => {
            return {
                todos: this.toggleProperty(todos, id, 'done')
            };
        });
    };

    onSearch = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((el) => {
            return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((el) => !el.done);
            case 'done':
                return items.filter((el) => el.done);
            default:
                return items;
        }
    }

    render() {

        const { todos, term, filter } = this.state;
        const visibleTodos = this.filter(this.search(todos, term), filter);
        const todoDone = todos.filter((el) => el.done).length;
        const doneCount = todos.length - todoDone;

        return (
            <div className='todo-app'>
                <Header toDo={doneCount} done={todoDone} />
                <div className='top-panel d-flex'>
                    <Search onSearch={this.onSearch} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange} />
                </div>
                <TodoList onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                    todos={visibleTodos} />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    };
};

export default App;