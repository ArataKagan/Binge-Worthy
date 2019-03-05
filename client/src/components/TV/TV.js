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
                this.setState({
                    selectedTV: response.data
                })
            });
        axios.get(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                if(response.data.results){
                    response.data.results.map( result => this.setState({
                        youtubeKey: 'https://www.youtube.com/embed/' + result.key
                    }));
                } else {
                    alert('No video for this TV');
                }
            });
        }

    youTubeModalShow(){
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
                        <div className='tv_info_wrapper'>
                            <p className='tv_info_title'>First Air Date:</p>
                            <p>{tv.first_air_date}</p>
                        </div>
                        <div className='tv_info_wrapper'>
                            <p className='tv_info_title'>Last Air Date:</p>
                            <p>{tv.last_air_date}</p>
                        </div>
                        <div className='tv_info_wrapper'>
                            <p className='tv_info_title'>Number of Episodes:</p>
                            <p>{tv.number_of_episodes}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TV;