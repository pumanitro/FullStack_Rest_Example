import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";
import {generateNArray} from "./helpers";

const generateRating = (handleChange) => {
    const rating = generateNArray(5);

    return rating.map( rating =>
        <FormGroup check>
            <Label>
                <Input onChange={() => handleChange(rating)} type="radio" name={`rating`}/>
                {rating}
            </Label>
        </FormGroup>
    )

};

export default ({handleChange}) => (
    <div>
        <FormGroup tag="fieldset">
            <legend>Radio Buttons</legend>
            { generateRating(handleChange) }
        </FormGroup>
    </div>
)

