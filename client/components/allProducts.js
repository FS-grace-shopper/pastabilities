import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store'

export class AllProducts extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const {products} = this.props
    // THIS IS OUR DUMMY TEST DATA!
    // const products = [
    //   {
    //     id: 1,
    //     name: 'Ravioli',
    //     description: 'The best in the city!',
    //     quantity: 10,
    //     photo: '/imageUrl',
    //     type: 'Semolina',
    //     shape: 'shaped',
    //     price: 995
    //   },
    //   {
    //     id: 2,
    //     name: 'Linguini',
    //     description: 'The best in the city!',
    //     quantity: 7,
    //     photo: '/imageUrl',
    //     type: 'Gluten-free',
    //     shape: 'long',
    //     price: 995
    //   },
    //   {
    //     id: 3,
    //     name: 'Cavatelli',
    //     description: 'The best in the city!',
    //     quantity: 5,
    //     photo: '/imageUrl',
    //     type: 'Whole Wheat',
    //     shape: 'long',
    //     price: 1995
    //   }
    // ]
    const noProducts = !products || products.length === 0
    return (
      <div className="product-list">
        {noProducts ? (
          <div className="title-area">There are no matching pastas.</div>
        ) : (
          <div>
            <div className="title-area">Pastas</div>
            <div className="listbox">
              {products.map(product => {
                return (
                  <div key={product.id} className="listbox item">
                    <div className="listbox img">
                      <img src={product.image} />
                    </div>
                    <div className="listbox product-name">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </div>
                    <div className="listbox description">
                      {product.description}
                    </div>
                    <div className="listbox price">${product.price / 100}</div>
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
  console.log(product)
  return {
    products: product.allProducts
  }
}
const mapDispatch = {fetchProducts}
export default connect(mapState, mapDispatch)(AllProducts)
