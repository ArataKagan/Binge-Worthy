import React, {Component}  from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';
import './TV.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200/';
const API_KEY = 'fb6a1d3f38c3d97f67df6d141f936f29'

class TV extends Component {
    state = {
        selectedTV: [],
        youtubeKey: [],
        showYouTubeModal: false
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
                console.log('[TV Youtube]', response.data.results[0].key);
                response.data.results.map( result => this.setState({
                    youtubeKey: 'http://www.youtube.com/embed/' + result.key
                }));
            });
        }

    youTubeModalShow(){
        console.log('clicked');
        this.setState({
            showYouTubeModal: true
        })   
    }

    youTubeModalClose(){
        this.setState({
            showYouTubeModal: false
        })
        
    }

    render(){
        const networkName = [];
        const genres = [];
        const tv = this.state.selectedTV;
        console.log('youtube key:', this.state.youtubeKey);

        const youtubeVideo = 
            <div className='youtube_video'>
            <Button variant="secondary" onClick={() => this.youTubeModalShow()}>Play Trailer</Button>
                <Modal show={this.state.showYouTubeModal} onHide={() => this.youTubeModalClose()}>
                    <Modal.Body>
                        <Iframe url = {this.state.youtubeKey}
                        width="450px"
                        height="450px"
                        id="myId"
                        className="youTubeVideo"
                        display="initial"
                        position="relative"
                        allowFullScreen />
                    </Modal.Body>
                </Modal>
            </div>

        for(var i in tv.networks){
            networkName.push(tv.networks[i].logo_path)
        }
        for(var i in tv.genres){
            genres.push(tv.genres[i].name + '/');
        }
        
        return(
            <div className='tv_container'>
                <div className='poster' key={tv.id}>
                    <a href={tv.homepage}><img id='tv_image' src={IMAGE_BASE_URL + tv.poster_path} alt={tv.name}/></a>
                </div>
                <div className='poster_wrapper'>
                    <div className='title_row'>
                        <h3 className='title'>{tv.name}</h3>
                        {youtubeVideo}
                    </div>
                    <div className='tv_info'>
                        <p className='overview' dir='auto'>{tv.overview}</p>
                        <img className='network_image' src={IMAGE_BASE_URL + networkName} alt={tv.name} />
                        <p>First Air Date: {tv.first_air_date}</p>
                        <p>Last Air Date: {tv.last_air_date}</p>
                        <p>Number of Episodes: {tv.number_of_episodes} </p>
                        <p>{genres}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TV;