import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductRating from "./ProductRating";
import ProductService from "./services/ProductService";

class App extends Component {

    constructor(props) {
       super(props);
       this.state = {
           name: '',
           code: '',
           nettoPrice: 0,
           VAT: 0,
           bruttoPrice: 0,
           category: '1',
           options: [],
           rating: '1',
           products: []
       }
    }

    handleDataRefresh = () => {
        ProductService.getProducts().then(res => {
            this.setState({products: res});
        });
    };

  render() {

        const {name, code, nettoPrice, VAT, bruttoPrice, category, options, rating} = this.state;


    return (
      <div className="container">
        <div>
          header
        </div>
        <div>

            <input onClick={this.handleDataRefresh} type="button" value="refresh"/>
            <Form>
                <FormGroup>
                    <Label for="productName">Product Name </Label>
                    <Input onChange={e => this.setState({name: e.target.value})} type="text" name="productName" id="productName" value={name}/>
                </FormGroup>
                <FormGroup>
                    <Label for="productCode">Product Code </Label>
                    <Input onChange={e => this.setState({code: e.target.value})} type="text" name="productCode" id="productCode" value={code}/>
                </FormGroup>
                <FormGroup>
                    <Label for="productNettoPrice">Product Netto Price </Label>
                    <Input onChange={e => this.setState({nettoPrice: e.target.value})} type="number" name="productNettoPrice" id="productNettoPrice" value={nettoPrice}/>
                </FormGroup>
                <FormGroup>
                    <Label for="productVAT">Product VAT </Label>
                    <Input onChange={e => this.setState({VAT: e.target.value})} type="number" name="productVAT" id="productVAT" value={VAT}/>
                </FormGroup>
                <FormGroup>
                    <Label for="productBruttoPrice">Product Brutto Price </Label>
                    <Input onChange={e => this.setState({bruttoPrice: e.target.value})} type="text" name="productBruttoPrice" id="productBruttoPrice" value={bruttoPrice}/>
                </FormGroup>
                <FormGroup>
                    <Label for="productCategory">Product Category</Label>
                    <Input onChange={e => this.setState({category: e.target.value})} type="select" name="productCategory" id="productCategory" value={category}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="productOptions">Product Options</Label>
                    <Input onChange={e => this.setState({options: [...e.target.selectedOptions].map(option => option.value)})} type="select" name="productOptions" id="productOptions" multiple>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
                <ProductRating handleChange={id => this.setState({rating: id})}/>
                <Button onClick={() => {ProductService.addProduct({
                    name, code, nettoPrice, VAT, bruttoPrice, category, options, rating
                })}}>Submit</Button>

                <div>
                    {JSON.stringify(this.state.products)}
                </div>

            </Form>
        </div>
        <div>
          footer
        </div>

      </div>
    );
  }
}

export default App;
