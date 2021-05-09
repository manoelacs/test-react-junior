import React from 'react'
import {CssBaseline, Typography, AppBar, Paper, Toolbar, makeStyles} from '@material-ui/core';

import Form from '../Form/index';
import Table from '../Table/index';

import { AppProvider } from '../../contexts/AppContext';

interface Iproduct {
  codeSKU: number;
  productName: string;
  price: string;
  category: { label: string; value: string };
}
const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

  

export default function Main() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);    
    
  
    return (
      <React.Fragment>
        <AppProvider>
          <CssBaseline />
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Company name
              </Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Adicione um produto
              </Typography>
              <Form />
              <Table/>

          </Paper>
          </main>
        </AppProvider>
        </React.Fragment>
    )
}