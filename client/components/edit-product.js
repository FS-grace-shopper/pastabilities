import React from 'react'
import ProductForm from './product-form'
import {putProduct, fetchProduct} from '../store'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: '',
      type: '',
      shape: '',
      error: {}
    }
    this.updateHandler = this.updateHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.goAddPage = this.goAddPage.bind(this)
  }
  async componentDidMount() {
    const {match, allProducts} = this.props
    const productId = Number(match.params.productId)
    const thisProduct = allProducts.find(item => item.id === productId)
    await this.setState(thisProduct)
    // this.props.fetchProduct(productId)
    // const {selectedProduct} = this.props
    // this.setState(selectedProduct)
  }
  updateHandler(event) {
    this.setState({error: {}})
    this.setState({[event.target.name]: event.target.value})
  }
  submitHandler(event) {
    try {
      event.preventDefault()
      if (!Number.isInteger(+this.state.price) || +this.state.price <= 0) {
        throw new Error(
          `The product's price must be a number greater than zero.`
        )
      }
      if (!Number.isInteger(+this.state.quantity) || +this.state.quantity < 0) {
        throw new Error(`The product's quantity must be a number.`)
      }
      this.props.postProduct(this.state)
      this.props.history.push('/products/admin')
    } catch (err) {
      this.setState({
        error: err
      })
    }
  }
  goAddPage(event) {
    this.props.history.push(event.target.value)
  }
  render() {
    return (
      <div>
        <button
          className="back-btn"
          value="/products/admin"
          onClick={this.goAddPage}
        >
          GO BACK
        </button>
        <div id="new-item">
          <h1>ADD A PASTA</h1>

          <ProductForm
            state={this.state}
            submitHandler={this.submitHandler}
            updateHandler={this.updateHandler}
          />
        </div>
      </div>
    )
  }
}

const mapState = ({product}) => {
  return {
    allProducts: product.allProducts,
    selectedProduct: product.selectedProduct
  }
}
const mapDispatch = dispatch => ({
  putProduct: product => dispatch(putProduct(product)),
  fetchProduct: product => dispatch(fetchProduct(product))
})

export default connect(mapState, mapDispatch)(EditProduct)
