import React from 'react';
import './ReceiptListItem.css';
import WebImage from '../WebImage/WebImage';
import { NavLink } from 'react-router-dom';

function ReceiptListItem(props) {
    return (
        <div className="receipt-list-item">
            <NavLink to={'/receipt-details/' + props.title + '/' + props.uuid}>
                {props.image &&
                    <WebImage src={props.image} alt={props.title} />
                }
                <h3 className="receipt-list-item-header">{props.title}</h3>
                <p>{props.description}</p>
            </NavLink>
        </div>
    )
}

export default ReceiptListItem;