import React, {Component} from 'react'
import ProductReview from './productReview'
import AddProductReview from './addProductReview'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {fetchProduct, addToCart, removeFromCart, changeQuantity} from '../store'
import Button from '@material-ui/core/Button'
//addToCart does not currently affect database
const styles = () => ({})
import Grid from '@material-ui/core/Grid'

class singleProduct extends Component {
  componentDidMount() {
    const productID = this.props.match.params.productID
    this.props.fetchProduct(productID)
  }

  render() {
    const {currentProduct, classes, userId} = this.props

    let alreadyReviewed = false
    if (currentProduct.reviews) {
      if (
        currentProduct.reviews.findIndex(review => {
          return review.userId === userId
        }) !== -1
      )
        alreadyReviewed = true
    }

    return (
      <div className="container">
        <div className="leftColumn">
          <img src={currentProduct.image} />
        </div>

        <div className="rightColumn">
          <div className="product-description">
            <span>Pasta</span>
            <h1>{currentProduct.name}</h1>
            <p>{currentProduct.description}</p>
          </div>

          <div className="product-price">
            <span>${(currentProduct.price / 100).toFixed(2)}</span>
            <Button
              size="small"
              color="primary"
              onClick={() => this.props.addToCart(this.props.currentProduct)}
            >
              Add to Cart
            </Button>
          </div>
          <Grid
            container
            className={classes.container}
            direction="column"
            spacing={16}
          >
            {!currentProduct.reviews || currentProduct.reviews.length === 0 ? (
              <React.Fragment>
                <h2>No reviews yet</h2>
                {userId && !alreadyReviewed ? (
                  <Button
                    size="small"
                    color="secondary"
                    className={classes.button}
                    onClick={() =>
                      this.props.history.push(
                        `/products/${currentProduct.id}/review`
                      )
                    }
                  >
                    Add a Review
                  </Button>
                ) : (
                  <div />
                )}
              </React.Fragment>
            ) : (
              <div className="card-box">
                <h2>Reviews</h2>
                {userId && !alreadyReviewed ? (
                  <Button
                    size="small"
                    color="secondary"
                    className={classes.button}
                    onClick={() =>
                      this.props.history.push(
                        `/products/${currentProduct.id}/review`
                      )
                    }
                  >
                    Add a Review
                  </Button>
                ) : (
                  <div />
                )}

                {currentProduct.reviews.map(review => (
                  <ProductReview
                    key={review.id}
                    review={review}
                    userId={userId}
                    history={this.props.history}
                  />
                ))}
              </div>
            )}
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentProduct: state.product.currentProduct,
    userId: state.user.id
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    addToCart: product => dispatch(addToCart(product)),
    removeFromCart: product => dispatch(removeFromCart(product)),
    changeQuantity: (product, quantity) =>
      dispatch(changeQuantity(product, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(
  withStyles(styles)(singleProduct)
)
