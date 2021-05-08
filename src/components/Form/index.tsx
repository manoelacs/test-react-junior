import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import { Input, Grid, TextField, FormControlLabel, Checkbox } from "@material-ui/core";

import  { AppContext} from '../../contexts/AppContext';

import "./styles.css";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
      
    },
    paper: {
      
    },
  }),
);

interface IFormInputs {
  codeSku: number;
  productName: string;
  price: string;
  category: { label: string; value: string };
}


const Form = () => {
  const classes = useStyles();

  const { control, formState: { errors }, handleSubmit, reset } = useForm<IFormInputs>();
  const {products, addProduct, skuExists} = React.useContext(AppContext);
  console.log( React.useContext(AppContext))

  console.log([...products])

  const onSubmit = (data: IFormInputs) => {
   
    if(!skuExists(data.codeSku)){
      addProduct(data);
      reset();
      alert(JSON.stringify(data));
    }
    else{
      alert("Código SKU já cadastrado no sistema!")
    }
    
  };

  return (
    <div >

    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={3}>
    
    <Grid item xs={12} md={3} >
      <label>Código SKU</label>
      <Controller
        render={({ field }) => <Input {...field } className="materialUIInput" type='number' />}
        name="codeSku"
        control={control}
        defaultValue=""
      />
    </Grid>
    <Grid item xs={12} md={9} >
      <label>Nome do Produto</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="productName"
        control={control}
        defaultValue=""
      />
    </Grid>
    <Grid item xs={12} md={6} >
      <label>Preço</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="price"
        control={control}
        defaultValue=""
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <label >Categoria</label>
      <Controller  
        name="category"
        render={({ field }) => (
          <Select  className="materialUIInput"
            {...field}
            options={[
              { value: "leite", label: "Leite" },
              { value: "doce", label: "Doce" },
              { value: "iogurte", label: "Iogurte" }
            ]}
          />
        )}
        control={control}
        defaultValue=""
      />
    </Grid>
    <button type="submit" className={'button'}>Salvar</button>
  </Grid>
  </form>
  </div>
  );
}; export default Form;
