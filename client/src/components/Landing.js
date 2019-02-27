import React, {Component} from 'react';
import './Landing.css';
import axios from 'axios';
import Card from './Card';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

class Landing extends Component {
    state = {
        tvs: []
    }

    componentDidMount(){
        axios.get('https://api.themoviedb.org/3/discover/tv?api_key=fb6a1d3f38c3d97f67df6d141f936f29&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false')
            .then(response => {
                this.setState({tvs: response.data.results});
                console.log(response.data.results);
            })
    }

    render(){
        const cards = this.state.tvs.map(tv => {
            return <Card title={tv.name} keys={tv.id} image={IMAGE_BASE_URL + tv.poster_path}/>;
        }); 
        

        return(
            <section className="Cards">
                {cards}
            </section>
        )
    }
}


export default Landing;