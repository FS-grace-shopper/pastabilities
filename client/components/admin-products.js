import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Link} from 'react-router-dom'

export class AdminProducts extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const {products} = this.props
    const noProducts = !products || products.length === 0
    return (
      <div className="product-list">
        {noProducts ? (
          <div className="title-area">
            <div>There are no matching pastas.</div>
            <Link to="/products/add">ADD NEW PRODUCT</Link>
          </div>
        ) : (
          <div>
            <div className="title-area">
              <div>Pastas</div>
              <Link to="/products/add">ADD NEW PRODUCT</Link>
            </div>
            <div className="listbox">
              {products.map(product => {
                return (
                  <div key={product.id} className="listbox item">
                    <div className="listbox img">
                      <Link to={`/products/${product.id}`}>
                        <img src={product.image} />
                      </Link>
                    </div>

                    <div className="listbox product-name">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </div>
                    <div className="listbox description">
                      <p>
                        Description: {product.description}
                        <br />
                        Price: ${(product.price / 100).toFixed(2)}
                        <br />
                        Quantity: {product.quantity}
                      </p>
                      <p>
                        <Link to={`/products/${product.id}/edit`}>EDIT</Link>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = ({product}) => {
  return {
    products: product.allProducts
  }
}
const mapDispatch = {fetchProducts}
export default connect(mapState, mapDispatch)(AdminProducts)
