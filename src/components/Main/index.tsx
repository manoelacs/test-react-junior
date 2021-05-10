import React from 'react'
import {CssBaseline, Typography, AppBar, Paper, Toolbar, Tab, Tabs, } from '@material-ui/core';

import Form from '../Form/index';
import Table from '../Table/index';

import { useStyles } from './styles';

import { AppContext, AppProvider } from '../../contexts/AppContext';

import { mockProducts } from '../../shareds/mockProducts';

interface Iproduct{
  id: any;
  codeSku: number;
  productName: string;
  price: string;
  category: { label: string; value: string };
} 
const data =  mockProducts; 
export default function Main() {

    const classes = useStyles();
    const [activeForm, setActiveForm] = React.useState(0);    
    const {products, addProduct, skuExists} = React.useContext(AppContext);
    console.log( products);    
  
    return (
      <React.Fragment>
        <AppProvider products = { data }>
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