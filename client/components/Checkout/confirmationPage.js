import React, {Fragment} from 'react'
import Typography from '@material-ui/core/Typography'

const ConfirmationPage = ({orderId}) => {
  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle1">
        Your order number is {orderId}. We have emailed your order confirmation,
        and will send you an update when your order has been shipped
      </Typography>
    </Fragment>
  )
}

export default ConfirmationPage
