import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SingleProduct from './SingleProduct';


import { GetProducts } from '../../ducks/products';

class Product extends Component {
  componentDidMount() {
    const { fetched } = this.props;

    if (!fetched) {
      this.props.GetProducts();
    }
  }

  render() {
    const { products } = this.props;

    if (products) {
      return (
        <div>
          <SingleProduct />
        </div>
      );
    } else {
      return (
        <div>

        </div>
      );
    }
  }
}

const mapStateToProps = ({ products: { fetched, products } }) => ({
  fetched,
  products
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      GetProducts
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Product);
