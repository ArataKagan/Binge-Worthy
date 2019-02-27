import React from 'react';
import './Card.css';

const Card = (props) => (
    <article className="Card" keys={props.keys}>
        <img src={props.image} alt="TV Poster"/>
        <div className="Info">
            <div className="title">{props.title}</div>
        </div>
    </article>
);

export default Card;