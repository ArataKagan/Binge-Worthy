import React, { Component } from 'react';
import './SearchBox.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const BASE_URL = 'https://api.themoviedb.org/3/search/tv?api_key=fb6a1d3f38c3d97f67df6d141f936f29&language=en-US&query='

class SearchBox extends Component { 
    state = {
        typedWords : '',
        keyword: [],
        redirect: false
    }


    handleChange= (e) => {
        this.setState({
            typedWords: e.target.value
        })
    } 

    handleSubmit(e){
        e.preventDefault();
        var query = this.state.typedWords.replace(/ /g, '%20');
        axios.get(BASE_URL + query)
            .then(response => {
                var searchResults = response.data.results;
                if(searchResults.length > 0){
                    this.setState({
                        keyword: query,
                        redirect: true
                    })
                } 
            })
        this.setState({
            typedWords: ''
        })
    }

    render(){
        if(this.state.redirect){
            return < Redirect to={`/tv/results/${this.state.keyword}`} key={this.state.keyword} />
        }

        return(
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSubmit(e)}>
                <input 
                    type="text" 
                    value={this.state.typedWords} 
                    onChange={(e) => this.handleChange(e)}
                    className="form-control mr-sm-2"
                    placeholder="Search TV Show..."
                />
                <input 
                    type="submit" 
                    className="btn btn-outline-success my-2 my-sm-0"
                />
            </form>
        )
    }
}

export default SearchBox;