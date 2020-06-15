import React, { Component } from 'react';
import './search.css';


export default class Search extends Component {

    state = {
        term: ''
    };
    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearch(term);
    }

    render() {
        return (<input
            className='form-control search-input'
            onChange={this.onSearchChange}
            value={this.state.term}
            placeholder='search' type='text' />);
    };
}