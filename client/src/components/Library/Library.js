import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Library.css';
import SearchBox from '../Search/Search';
import axios from 'axios';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

class Library extends Component {
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
            return(
            <article className="Card" key={tv.id}>
                <Link to={`/tv/${tv.id}`} key={tv.id}>
                    <img src={IMAGE_BASE_URL + tv.poster_path} alt={tv.name} />
                    <div className="Info" key={tv.id}>
                        <div className="title">{tv.name}</div>
                    </div>
                </Link>
            </article>
            );
        }); 
        
        return(
            <div>
                <SearchBox />
                <section className="Cards">
                    {cards}
                </section>
            </div>
        );
    }
}


export default Library;