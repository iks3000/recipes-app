import axios from "axios";
import React, { useState } from "react";
import {Link, useParams} from "react-router-dom";
import { Circles } from  "react-loader-spinner";
import NotFound from "../NotFound/NotFound";
import "./Receipt.css";
import moment from "moment";
import Ingridient from "../Ingridient/Ingridient";

function Receipt (props) {
    let params = useParams();

    const [loading, setLoading] = useState(true);
    const [receipt, setReceipt] = useState({});
    const [httpError, setHttpError] = useState(false);
    const [specials, setSpecials] = useState([]);

    if (params.id && receipt.uuid === undefined && !httpError) {
        axios.get('http://localhost:3001/recipes/' + params.id).then((response) => {
            setReceipt(response.data);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setHttpError(true);
        });
        axios.get('http://localhost:3001/specials').then((response) => {
            setSpecials(response.data);
        });
    }

    function getSpecial(uuid) {
        return specials.find((special) => {
            return special.ingredientId === uuid;
        })
    }

    return(
        <div className="receipt-container">
            {loading &&
                <div className="loading-container">
                    <Circles color="#00BFFF" height={80} width={80}/>
                </div>
            }
            {httpError &&
                <NotFound />
            }
            {!loading && !httpError &&
                <div className="receipt-details">
                    <div className="receipt-details-actionbar">
                        <Link to="/" className="back-button">Back</Link>
                        <Link to={"/edit/" + receipt.uuid} className="edit-button">Edit</Link>
                    </div>
                    <h2>
                        {receipt.title}
                    </h2>
                    <p>
                        {receipt.description}
                    </p>
                    <p className="created-at">
                        Created at: {moment(receipt.postDate).format('MMM D, YYYY')}
                        <br />
                        Updated at: {moment(receipt.editDate).format('MMM D, YYYY')}
                    </p>
                    <p className="receipt-image-full">
                        <img src={'http://localhost:3001/' + receipt.images.full} alt={receipt.title} />
                    </p>
                    <p>
                        Servings: {receipt.servings} | Preparation Time: {receipt.prepTime} | Cook Time: {receipt.cookTime}
                    </p>
                    <div className="ingridients-and-steps-container">
                        <div className="ingridients">
                            <h2>
                                Ingridients
                            </h2>
                            <div>
                                {receipt.ingredients.map((ingridient, index) => {
                                    return (<Ingridient key={'key' + ingridient.uuid} index={index.toString()} ingridient={ingridient} special={getSpecial(ingridient.uuid)} />)
                                })}
                            </div>
                        </div>
                        <div className="steps">
                            <h2>
                                Cooking steps
                            </h2>
                            {receipt.directions.map((direction, index) => {
                                return (<div key={'step' + index.toString()} className="step">
                                    <strong>Step {index + 1}.</strong> <span>{direction.optional && " (Optional) "} {direction.instructions}</span>
                                </div>)
                            })}
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}

export default Receipt;