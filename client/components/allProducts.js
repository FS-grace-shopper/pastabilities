import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchProducts,
  fetchProduct,
  destroyProduct,
  updatePage,
  filterProducts,
  addWithUser
} from '../store'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import ReactPaginate from 'react-paginate'
import StarRatings from 'react-star-ratings'

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
    width: 225,
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
  compo

  handlePaginateClick = data => {
    const indexStart = data.selected * this.props.productsPerPage
    const indexEnd = indexStart + this.props.productsPerPage
    const newPage = this.props.visibleProducts.slice(indexStart, indexEnd)
    console.log('newpage<>', newPage)
    this.props.updatePage(newPage)
  }

  handleFilterSelection = async data => {
    const newVisiableProducts = this.props.products.filter(
      product => product.type === data.target.value
    )
    await this.props.filterProducts(newVisiableProducts)

    const indexStart = 0
    const indexEnd = indexStart + this.props.productsPerPage
    const newPage = this.props.visibleProducts.slice(indexStart, indexEnd)
    this.props.updatePage(newPage)
  }

  handleSortSelection = data => {
    const sortedProducts = this.props.visibleProducts.sort(
      compareValues(data.target.value)
    )
    console.log(sortedProducts)
  }

  compareValues(key, order = 'asc') {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

      let comparison = 0
      if (varA < varB) {
        comparison = 1
      } else if (varA > varB) {
        comparison = -1
      }
      return order === 'desc' ? comparison * -1 : comparison
    }
  }

  render() {
    const {
      classes,
      products,
      currentPage,
      numPages,
      visibleProducts,
      userId
    } = this.props

    const types = [
      {id: 1, value: 'whole-wheat'},
      {id: 2, value: 'gluten-free'},
      {id: 3, value: 'semolina'}
    ]
    const sortBy = [
      {id: 1, value: 'name'},
      {id: 2, value: 'description'},
      {id: 3, value: 'price'},
      {id: 4, value: 'type'},
      {id: 5, value: 'shape'}
    ]

    const noProducts = !products || products.length === 0
    return (
      <React.Fragment>
        <nav className={classes.productFilter}>
          <h1 className={classes.title}>Pasta</h1>
          <div className={classes.sort}>
            <div className={classes.collectionSort}>
              <label>Filter By:</label>
              <select name="filter" onChange={this.handleFilterSelection}>
                <option value="/">All Pastas</option>
                {/* need to handle for all pastats */}
                {types.map(type => {
                  return (
                    <option key={type.id} value={type.value}>
                      {type.value}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className={classes.sort}>
            <div className={classes.collectionSort}>
              <label>Sort By:</label>
              <select name="sort" onChange={this.handleSortSelection}>
                <option value="/">Featured</option>
                {sortBy.map(filter => {
                  return (
                    <option key={filter.id} value={filter.id}>
                      {filter.value}
                    </option>
                  )
                })}
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
                        <Typography variant="h5" align="center" noWrap={true}>
                          {product.name}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          ${(product.price / 100).toFixed(2)}
                        </Typography>
                        <div align="center">
                          <br />
                          {product.reviews.length > 0 && (
                            <StarRatings
                              rating={Number(
                                product.reviews.reduce((sum, item) => {
                                  return sum + +item.rating
                                }, 0) / product.reviews.length
                              )}
                              starRatedColor="blue"
                              starDimension="20px"
                              starSpacing="5px"
                            />
                          )}
                        </div>
                      </CardContent>
                      <CardActions>
                        <Link to={`/products/${product.id}`}>
                          <Button size="small" color="primary">
                            View
                          </Button>
                        </Link>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => this.props.addToCart(product, userId)}
                        >
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
              <div id="react-paginate">
                <ReactPaginate
                  previousLabel="Prev"
                  nextLabel="Next"
                  breakLabel="..."
                  breakClassName="break-me"
                  pageCount={numPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePaginateClick}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                />
              </div>
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
    currentPage: product.currentPage,
    numPages: product.numPages,
    productsPerPage: product.productsPerPage,
    visibleProducts: product.visibleProducts,
    types: product.types
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
    },
    updatePage: id => {
      dispatch(updatePage(id))
    },
    filterProducts: id => {
      dispatch(filterProducts(id))
    },
    addToCart: (product, userId) => {
      dispatch(addWithUser(product, userId))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(
  withStyles(styles)(AllProducts)
)
