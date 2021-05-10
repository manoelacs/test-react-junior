import React, { useContext, useState } from 'react'
import { Add} from '@material-ui/icons'
import {CssBaseline, Typography, AppBar, Paper, Toolbar, Tab, Tabs, IconButton } from '@material-ui/core';

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
    const {products, addProduct, skuExists} = useContext(AppContext);
    const [activeForm, setActiveForm] = useState(false);
    console.log( products);  
    const handleVisibleForm = () => {
      activeForm? setActiveForm(false) : setActiveForm(true)
    }   

  
    return (
      <React.Fragment>
        <AppProvider products = { data } activeForm={activeForm}>
          <CssBaseline />
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                XProdutos
              </Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
          
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Adicione um produto 
                <IconButton onClick={handleVisibleForm }
                  color="primary"
                 >
                   <Add />
               </IconButton>   
              </Typography>              
              { activeForm && <Form handleVisibleForm = { handleVisibleForm} />}
              <Table/>

            </Paper>
          </main>
        </AppProvider>
        </React.Fragment>
    )
}