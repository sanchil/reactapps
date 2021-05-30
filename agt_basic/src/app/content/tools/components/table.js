import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const useStyles = makeStyles({
  tablecontainer: {
    maxWidth: props => props.width,
  },
  table: {
    minWidth: 180,
    maxWidth: props => props.width,

  },
});



const DenseTable = (props) => {
  const classes = useStyles(props);
  const rows = props.rows;


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">

        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DenseTable;




const useTableStyles = makeStyles({

  table: {

    width: props => props.width,
    maxWidth: props => props.width,
    borderCollapse: 'collapse',


  },
  td: {
    border: '1px solid #ddd',
    padding: 8
  },
  tr: {
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2'
    },

    '&:hover': {
      backgroundColor: '#ddd'
    }

  }




});



export const SimpleTable = (props) => {
  const classes = useTableStyles(props);
  const rows = props.rows;
  return (
    <table className={classes.table}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={classes.tr}>
            <td className={classes.td}>  {row.name}</td>
            <td className={classes.td}>  {row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

}
