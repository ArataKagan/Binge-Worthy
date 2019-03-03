import React, {Component}  from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';
import './TV.css';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200/';
const API_KEY = 'fb6a1d3f38c3d97f67df6d141f936f29'

class TV extends Component {
    state = {
        selectedTV: [],
        youtube: []
    }

    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                console.log('[TV]', response);
                this.setState({
                    selectedTV: response.data
                })
            });
        axios.get(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                console.log('[TV Youtube]', response);
                this.setState({
                    youtube: response.data.results
                })
            })
    }

    render(){
        const tv = this.state.selectedTV;
        console.log(tv);
        const video = this.state.youtube[0];
       
       
        return(
            <div className='container' key={tv.id}>
                <a href={tv.homepage}><img id='tv_image' src={IMAGE_BASE_URL + tv.poster_path} alt={tv.name}/></a>
                <h3 className='title'>{tv.name}</h3>
                <p className='overview'>{tv.overview}</p>
                {/* <Iframe url="http://www.youtube.com/embed/"
                    width="450px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen/> */}
            </div>
        )
    }
}

export default TV;