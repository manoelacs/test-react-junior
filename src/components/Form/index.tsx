import React, {useContext} from "react";
import Select from "react-select";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";

import { Input, Grid, Button} from "@material-ui/core";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import  { AppContext} from '../../contexts/AppContext';

import "./styles.css";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { 
      padding: theme.spacing(3, 0, 5),    
    },
    paper: {     
    },
    buttons: {
      display: 'flex',
      justifyContent: 'end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }),
);

interface IFormInputs {
  id: any;
  codeSku: number;
  productName: string;
  price: string;
  category: { label: string; value: string };
}
interface IFormProps{
  handleVisibleForm: () => void
}
const schema = yup.object().shape({
  id: yup.string().required(),
  codeSku: yup.number().positive().integer().required(),
  productName: yup.string().required(),
  price: yup.string().required(),
  category: yup.object().shape({ label: yup.string(), value: yup.string()})
});


const Form = ( {handleVisibleForm}: IFormProps) => {
  const classes = useStyles();

  const { control, register, formState: { errors }, handleSubmit, reset } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });;
  const {products, addProduct, skuExists, activeForm} = useContext(AppContext);
  console.log( React.useContext(AppContext))

  console.log([...products])

  const onSubmit = (data: IFormInputs) => {
   
    if(!skuExists(data.codeSku)){
      console.log(products[products.length-1].id)
      const id  = (products[products.length-1].id) + 1;
      data.id = id;
      addProduct(data);
      reset();
      alert(JSON.stringify(data));
    }
    else{
      alert("Código SKU já cadastrado no sistema!")
    }
    
  };

  return (
    <div className={classes.root} >

    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={3}>
    
    <Grid item xs={12} md={3} >
      <label>Código SKU</label>
      {/* <Input {...register("codeSku", { required: true })} />
      <p>{errors.codeSku?.message}</p> */}
      {<Controller
        render={({ field }) => <> <Input {...field } className="materialUIInput" type='number' />
         {errors.codeSku && <p>{errors.codeSku.message}</p> } </>
         }
        name="codeSku"
        control={control}
        defaultValue=""
      />}
    </Grid>
    <Grid item xs={12} md={9} >
      <label className={'label'}> Nome do Produto</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="productName"
        control={control}
        defaultValue=""
      />
    </Grid>
    <Grid item xs={12} md={6} >
      <label className={'label'}>Preço</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="price"
        control={control}
        defaultValue=""
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <label className={'label'} >Categoria</label>
      <Controller  
        name="category"
        render={({ field }) => (
          <Select  className={'select'}
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
    <Grid >
      <div className={classes.buttons}>
          <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
          >Salvar</Button>
           <Button onClick={ handleVisibleForm }
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.button}
          >Cancelar</Button>

      </div>

    </Grid>
   
    
    {/* <button type="submit" className={'button'}>Salvar</button> */}
  </Grid>
  </form>
  </div>
  );
}; export default Form;


