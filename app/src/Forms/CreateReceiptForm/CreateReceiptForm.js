import './CreateReceiptForm.css';
import { Button, Checkbox, Divider, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../../Components/NotFound/NotFound";

export default function CreateReceiptForm() {

    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState({
        small: {},
        medium: {},
        full: {}
    });
    const [loading, setLoading] = useState(params.id !== undefined);
    const [receipt, setReceipt] = useState({
        title: '',
        cookTime: 0,
        prepTime: 0,
        servings: 0,
        description: '',
        directions: [
            {instructions: '', optional: false}
        ],
        images: {
            full: '',
            medium: '',
            small: ''
        },
        ingredients: [
            {amount: 0, measurement: '', name: ''}

        ]
    });

    const forceUpdate = React.useState()[1].bind(null, {})
    const [httpError, setHttpError] = useState(false);

    if (params.id && receipt.uuid === undefined && !httpError) {
        axios.get('http://localhost:3001/recipes/' + params.id).then((response) => {
            setReceipt(response.data);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setHttpError(true);
        });
    }

    const handleChangeIngridient =
        (prop, index) => (event) => {
            receipt.ingredients[index][prop] = event.target.value;
            setReceipt(receipt);
            forceUpdate();
        }

    const handleAddIngredient =
        () => (event) => {
            receipt.ingredients.push({amount: 0, measurement: '', name: ''});
            setReceipt(receipt);
            forceUpdate();
        }

    const handleChangeDirections =
        (prop, index) => (event) => {
            receipt.directions[index][prop] = event.target.value;
            setReceipt(receipt);
            forceUpdate();
        }

    const onFileChange =
        (size) => (event) => {
            console.log(event.target.files[0]);
            setFiles({...files, [size]: event.target.files[0]});
        }

    const handleAddDirection = () => {
        receipt.directions.push({instructions: '', optional: false});
        setReceipt(receipt);
        forceUpdate();
    }

    const handleChange =
        (prop) => (event) => {
            setReceipt({ ...receipt, [prop]: event.target.value });
        };

    const doUpdateRecipe = () => {
        setLoading(true);
        axios.patch('http://localhost:3001/recipes/' + receipt.uuid, receipt).then((resp) => {
            navigate('/receipt-details/' + resp.data.title + '/' + resp.data.uuid, { replace: false });
            setLoading(false);
        });
    }

    const doInsertRecipe = (receipt) => {
        setLoading(true);
        axios.post('http://localhost:3001/recipes', receipt).then((resp) => {
            navigate('/receipt-details/' + resp.data.title + '/' + resp.data.uuid, { replace: false });
        });
    }

    const handleFormSubmit =
        () => (event) => {
            event.preventDefault();
            const formData = new FormData();
            let filesShouldUpload = false;
            if (files.small.size) {
                formData.append('small', files.small, files.small.name);
                filesShouldUpload = true;
            }
            if (files.medium.size) {
                formData.append('medium', files.medium, files.medium.name);
                filesShouldUpload = true;
            }
            if (files.full.size) {
                formData.append('full', files.full, files.full.name);
                filesShouldUpload = true;
            }
            if (filesShouldUpload) {
                setLoading(true);
                axios.post('http://localhost:3001/images', formData).then((res) => {
                    if (res.data.small) {
                        receipt.images.small = extractFilename(res.data.small)
                    }
                    if (res.data.medium) {
                        receipt.images.medium = extractFilename(res.data.medium)
                    }
                    if (res.data.full) {
                        receipt.images.full = extractFilename(res.data.full)
                    }

                    if (receipt.uuid === undefined) {
                        doInsertRecipe(receipt);
                    } else {
                        doUpdateRecipe(receipt);
                    }
                });
            } else {
                if (receipt.uuid === undefined) {
                    doInsertRecipe(receipt);
                } else {
                    doUpdateRecipe(receipt);
                }
            }

            return false;
    }

    const extractFilename = (path) => {
        let splittedPath = path.split('/');
        return splittedPath.slice(1).join('/');
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

            <div className="form-container">
                <div className="form-row">
                    <TextField value={receipt.title}  label="Recipe title" variant="outlined" onChange={handleChange('title')} sx={{width: '80%'}}/>
                </div>
                <div className="form-row">
                    <TextField
                        sx={{width: '80%'}}
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        value={receipt.description}
                        onChange={handleChange('description')}
                        />
                </div>
                <div className='form-row'>
                    <Divider />
                </div>
                    <div className="label-wrapper">
                        <div className='form-row'>
                            <label className="form-label">Small size</label>
                            <input type={'file'} onChange={onFileChange('small')} />
                        </div>
                        <div className='form-row'>
                            <label className="form-label">Medium size</label>
                            <input type={'file'} onChange={onFileChange('medium')} />
                        </div>
                        <div className='form-row'>
                            <label className="form-label">Full size</label>
                            <input type={'file'} onChange={onFileChange('full')} />
                        </div>
                </div>

                <div className='form-row'>
                    <Divider />
                </div>
                <div className="form-row">
                    <div className='form-column'>
                        <TextField value={receipt.prepTime}  label="Prep time" variant="outlined" onChange={handleChange('prepTime')} sx={{width: '75%'}}/>
                    </div>
                    <div className='form-column'>
                        <TextField value={receipt.cookTime}  label="Cook time" variant="outlined" onChange={handleChange('cookTime')} sx={{width: '75%'}}/>
                    </div>
                    <div className='form-column'>
                        <TextField value={receipt.servings}  label="Servings" variant="outlined" onChange={handleChange('servings')} sx={{width: '75%'}}/>
                    </div>
                </div>
                <div className='form-row'>
                    <Divider />
                </div>
                {receipt.ingredients.map((ingridient, index) => {
                    return <div className='form-row' key={'ing_' + index.toString()}>
                        <div className='form-column'>
                            <TextField value={ingridient.amount}  label="Amount" variant="outlined" onChange={handleChangeIngridient('amount', index)} sx={{width: '75%'}}/>
                        </div>
                        <div className='form-column'>
                            <TextField value={ingridient.measurement}  label="Measurement" variant="outlined" onChange={handleChangeIngridient('measurement', index)} sx={{width: '75%'}}/>
                        </div>
                        <div className='form-column'>
                            <TextField value={ingridient.name}  label="Name" variant="outlined" onChange={handleChangeIngridient('name', index)} sx={{width: '75%'}}/>
                        </div>
                    </div>
                })}
                <div className='form-row'><Button onClick={handleAddIngredient()}>Add ingridient</Button></div>
                <div className='form-row'>
                    <Divider />
                </div>
                {receipt.directions.map((direction, index) => {
                    return (<div className='form-row' key={'dir_' + index.toString()}>
                        <TextField value={direction.instructions}  label="Instruction" variant="outlined" onChange={handleChangeDirections('instructions', index)} sx={{width: '75%'}}/>
                        <Checkbox checked={direction.optional} label="Is optional" onChange={handleChangeDirections('optional', index)}/>
                    </div>)
                })
                }
                <div className='form-row'><Button onClick={handleAddDirection}>Add Direction</Button></div>
                <div className='form-row'>
                    <Divider />
                </div>
                <div className='form-row'>
                    <div className='form-column'>
                        <Button onClick={() => {navigate('/')}}>Back</Button>
                    </div>
                    <div className='form-column'>
                        <Button onClick={handleFormSubmit()} >Save</Button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}