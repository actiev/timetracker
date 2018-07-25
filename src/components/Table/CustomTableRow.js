import {withStyles} from '@material-ui/core/styles/'
import TableRow from '@material-ui/core/TableRow'

const CustomTableRow = withStyles(({
  root: {
    backgroundColor: '#eaf6ff',
    height: 75
  }
}))(TableRow)

export default CustomTableRow