import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, fetchProduct, destroyProduct} from '../store'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    spacing: 8
  },
  item: {
    padding: 10,
    flexGrow: 1,
    flexBasis: '16%',
    display: 'flex'
  },
  card: {
    width: 200,
    height: '100%'
  },
  cardMedia: {
    paddingTop: '70%'
  },
  productFilter: {
    display: 'flex',
    paddingTop: 30,
    paddingBottom: 30
  },
  title: {
    flexGrow: 1
  },
  sort: {
    display: 'flex'
  },
  collectionSort: {
    display: 'flex',
    flexDirection: 'column'
  }
})
export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {classes, products, currentPage} = this.props
    const noProducts = !products || products.length === 0

    return (
      <React.Fragment>
        <nav className={classes.productFilter}>
          <h1 className={classes.title}>Pasta</h1>
          <div className={classes.sort}>
            <div className={classes.collectionSort}>
              <label>Filter By:</label>
              <select>
                <option value="/">All Pastas</option>
              </select>
            </div>
          </div>
          <div className={classes.sort}>
            <div className={classes.collectionSort}>
              <label>Sort By:</label>
              <select>
                <option value="/">Featured</option>
              </select>
            </div>
          </div>
        </nav>
        {this.props.isAdmin ? (
          <Link to="/admin/products/add">
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
            >
              ADD NEW PASTA
            </Button>
          </Link>
        ) : (
          <div />
        )}
        <div className={classes.div}>
          {noProducts ? (
            <div className={classes.div}>
              <Paper>
                <Typography variant="h1">
                  We ran out of Pasta! Please come back soon!
                </Typography>
              </Paper>
            </div>
          ) : (
            <div className={classes.product}>
              <Grid container className={classes.container} spacing={16}>
                {currentPage.map(product => (
                  <Grid key={product.id} item className={classes.item}>
                    <Card className={classes.card}>
                      <Link
                        to={`/products/${product.id}`}
                        onClick={() => {
                          this.props.fetchProduct(product.id)
                        }}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={product.image}
                        />
                      </Link>
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h5" align="center">
                          {product.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={`/products/${product.id}`}>
                          <Button size="small" color="primary">
                            View
                          </Button>
                        </Link>
                        <Button size="small" color="primary">
                          Add to Cart
                        </Button>
                      </CardActions>
                      {this.props.isAdmin ? (
                        <CardActions>
                          <Link to={`/admin/products/${product.id}/edit`}>
                            <Button size="small" color="secondary">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            size="small"
                            color="secondary"
                            value={product.id}
                            onClick={() => {
                              this.props.destroyProduct(product.id)
                            }}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      ) : (
                        <div />
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}

const mapState = ({product, user}) => {
  return {
    products: product.allProducts,
    isAdmin: user.isAdmin,
    currentPage: product.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    fetchProduct: id => {
      dispatch(fetchProduct(id))
    },
    destroyProduct: id => {
      dispatch(destroyProduct(id))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(
  withStyles(styles)(AllProducts)
)

// import React from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { fetchProducts, fetchProduct, destroyProduct } from '../store'

// import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
// import { withStyles } from '@material-ui/core/styles'

// import ReactPaginate from 'react-paginate'

// import AllProductsList from './allProductsList'

// const styles = () => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     spacing: 8
//   },
//   item: {
//     padding: 10,
//     flexGrow: 1,
//     flexBasis: '16%',
//     display: 'flex'
//   },
//   card: {
//     width: 200,
//     height: '100%'
//   },
//   cardMedia: {
//     paddingTop: '70%'
//   },
//   productFilter: {
//     display: 'flex',
//     paddingTop: 30,
//     paddingBottom: 30
//   },
//   title: {
//     flexGrow: 1
//   },
//   sort: {
//     display: 'flex'
//   },
//   collectionSort: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   ul: {
//     display: 'inline-block',
//     paddingLeft: '15px',
//     paddingRight: '15px'
//   },
//   li: {
//     display: 'inline - block'
//   }
// })

// export class AllProducts extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentPage: [],
//     }
//   }

//   componentDidMount() {
//     this.props.fetchProducts()
//     // const perPage = this.state.perPage
//     // const firstPage = this.props.products.slice(0, perPage)
//     // const numPages = Math.ceil(this.props.products.length / perPage)
//     // console.log('firstPage: ', firstPage, 'perPage: ', perPage, 'numPages: ', numPages)
//     // this.setState({
//     //   currentPage: firstPage,
//     //   numPages: numPages
//     // })
//   }

//   handlePageClick = (data) => {
//     console.log(data.selected)
//     const indexStart = data.selected * this.props.perPage
//     const indexEnd = indexStart + this.props.perPage
//     console.log('indexStart: ', indexStart, 'indexEnd: ', indexEnd)
//     const newPage = props.products.slice(indexStart, indexEnd)

//     console.log('newPage', newPage)
//     this.setState({
//       currentPage: newPage
//     })

//   };

//   render() {
//     const { classes, products } = this.props
//     const noProducts = !products || products.length === 0
//     console.log('noProducts: ', noProducts)
//     return (

//       <React.Fragment>
//         <nav className={classes.productFilter}>
//           <h1 className={classes.title}>Pasta</h1>
//           <div className={classes.sort}>
//             <div className={classes.collectionSort}>
//               <label>Filter By:</label>
//               <select>
//                 <option value="/">All Pastas</option>
//               </select>
//             </div>
//           </div>
//           <div className={classes.sort}>
//             <div className={classes.collectionSort}>
//               <label>Sort By:</label>
//               <select>
//                 <option value="/">Featured</option>
//               </select>
//             </div>
//           </div>
//         </nav>
//         {this.props.isAdmin ? (
//           <Link to="/admin/products/add">
//             <Button
//               variant="contained"
//               className={classes.button}
//               color="primary"
//             >
//               ADD NEW PASTA
//             </Button>
//           </Link>
//         ) : (
//             <div />
//           )}
//         <div className={classes.div}>
//           {noProducts ? (
//             <div className={classes.div}>
//               <Paper>
//                 <Typography variant="h1">
//                   We ran out of Pasta! Please come back soon!
//                 </Typography>
//               </Paper>
//             </div>
//           ) : (
//               <div className={classes.product}>
//                 <Grid container className={classes.container} spacing={16}>
//                   {/* //need to update this for the current products */}
//                   <AllProductsList products={this.props.allProducts} />
//                 </Grid>
//                 <div id="react-paginate">
//                   <ReactPaginate
//                     previousLabel="Prev"
//                     nextLabel="Next"
//                     breakLabel="..."
//                     breakClassName="break-me"
//                     pageCount={this.state.numPages}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={5}
//                     onPageChange={this.handlePageClick}
//                     containerClassName="pagination"
//                     subContainerClassName="pages pagination"
//                     activeClassName="active"
//                   />
//                 </div>
//               </div>
//             )}
//         </div>
//       </React.Fragment>
//     )

//   }
// }

// const mapState = ({ product, user }, ownProps) => {
//   console.log(ownProps)
//   return {
//     products: product.allProducts,
//     isAdmin: user.isAdmin
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchProducts: () => {
//       dispatch(fetchProducts())
//     },
//     fetchProduct: id => {
//       dispatch(fetchProduct(id))
//     },
//     destroyProduct: id => {
//       dispatch(destroyProduct(id))
//     }
//   }
// }

// export default connect(mapState, mapDispatchToProps)(
//   withStyles(styles)(AllProducts)
// )
