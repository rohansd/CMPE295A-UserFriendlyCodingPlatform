import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core'


const styles = theme => ({
...theme,
Row:  {
margin: 10 
      }
})

const Try = () => {
  const items = ['a', 'b'];
//   const {classes} = this.props
  return (     
    <div style={{ maxWidth: "100%" }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
                <TableRow key={item}
                // className={classes.Row}
                >
                <TableCell>{item}</TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

// export default withStyles(styles)(Try)
export default Try