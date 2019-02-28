import React, {Component}  from 'react';
import axios from 'axios';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

class TV extends Component {
    state = {
        selectedTV: []
    }

    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=fb6a1d3f38c3d97f67df6d141f936f29&language=en-US`)
            .then(response => {
                console.log(response);
                this.setState({
                    selectedTV: response.data
                })
            })
    }

    render(){
        console.log(this.state.selectedTV.name);
        return(
            <div key={this.state.selectedTV.id}>
                <h3>{this.state.selectedTV.name}</h3>
                <img src={IMAGE_BASE_URL + this.state.selectedTV.poster_path} alt={this.state.selectedTV.name}/>
                <p>{this.state.selectedTV.overview}</p>
            </div>
        )
    }
}

export default TV;