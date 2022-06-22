import React from "react";
import ImageListItem from '@mui/material/ImageListItem';

function WebImage(props) {
    return (
        <ImageListItem>
            <img
                src={`${ 'http://localhost:3001/' + props.src }?w=248&fit=crop&auto=format`}
                alt={props.alt}
                loading="lazy"
            />
        </ImageListItem>
    )
}

export default WebImage;