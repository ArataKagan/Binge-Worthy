import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const BASE_URL = 'https://api.themoviedb.org/3/search/tv?api_key=fb6a1d3f38c3d97f67df6d141f936f29&language=en-US&query='

class Search extends Component { 
    state = {
        typedWords : '',
        tvID: [],
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
                var tvID = response.data.results[0].id;
                this.setState({
                    tvID: tvID,
                    redirect: true
                })
            })
        this.setState({
            typedWords: ''
        })
    }

    render(){
        if(this.state.redirect){
            return < Redirect to={`/tv/${this.state.tvID}`} key={this.state.tvID} />
        }

        return(
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input 
                    type="text" 
                    value={this.state.typedWords} 
                    onChange={(e) => this.handleChange(e)}
                    className='textArea'
                />
                <input 
                    type="submit" 
                    className='submitBtn'
                />
            </form>
        )
    }
}

export default Search;