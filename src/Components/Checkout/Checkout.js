import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import './Checkout.scss'

class Checkout extends Component {
constructor(props){
    super(props)
}
onToken = async() => {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
  }

  // ...

  render() {
    return (
      // ...
      <div id='checkout'>
          <StripeCheckout
            token={this.onToken}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
            name="Shop Lime"
            shippingAddress={true}
            billingAddress={true}
          />
      </div>
    )
  }
}
export default Checkout