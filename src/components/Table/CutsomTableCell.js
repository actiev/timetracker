import {withStyles} from '@material-ui/core/styles/'
import TableCell from '@material-ui/core/TableCell/'

const CustomTableCell = withStyles(({
  head: {
    backgroundColor: '#fff',
    color: '#a19e9e',
    height: 65,
    fontSize: 14
  },
  body: {
    fontSize: 14,
    color: '#344dc4'
  }
}))(TableCell)

export default CustomTableCell
