import axios from "axios";
import React, { useState, useEffect} from "react";
import ReceiptListItem from "../ReceiptListItem/ReceiptListItem";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './ReceiptList.css';

function ReceiptList() {
    const [receips, setReceips] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/recipes').then((response) => {
            setReceips(response.data);
        });
    }, [receips])

    return (
        <>
            <div className="btn-wrapper">
                <NavLink to={'/add-recipe'}>
                    <Button variant="contained">Add New Recipe</Button>
                </NavLink>
            </div>
            <div className="receipt-list">
                {receips.map((receipt, index) => {
                    return (
                        <ReceiptListItem
                            key={index.toString()}
                            className="receipt-item"
                            image={receipt.images?.small}
                            title={receipt.title}
                            description={receipt.description}
                            uuid={receipt.uuid}
                        />
                    )
                }
                )}
            </div>
        </>
    );
}

export default ReceiptList;