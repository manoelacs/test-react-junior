/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createContext, ReactNode, useEffect, useState } from 'react';
import { mockProducts } from '../shareds/mockProducts';

export const AppContext = createContext({} as ContextDataValues);

interface Iproduct{
    id: any;
    codeSku: number;
    productName: string;
    price: string;
    category: { label: string; value: string };
}
//const data =  mockProducts;
interface ContextDataValues{
    products: Iproduct[];
    addProduct: (product: Iproduct) => void;
    deleteProduct: (codeSku:number) => void;
    //editProduct: () => void;
    skuExists: (codeSku:number) => boolean; 
}

interface AppProviderProps{
    children: ReactNode;
    products: Iproduct[];     
}

export function AppProvider({ 
    children,
    ...rest } : AppProviderProps){

        const [products, setProducts] = useState<Iproduct[]>( rest.products ?? []);
        console.log(products);

        const addProduct = (product: Iproduct) => {
            setProducts([...products, product]);
           // data.concat(product);
            console.log('produto adicionado', products);
        }
        const skuExists = (codeSku:number) => {          
           const exist =  products.filter(item => item.codeSku === codeSku)           
           const resp = exist.length > 0 ? true: false;          
           return resp;
        }
        const deleteProduct = (codeSku: number) => {

            let index= -1;
            for(let i = 0; i < products.length; i++) {
                if(products[i].codeSku === codeSku){
                    index = i;
                }
            }
            if(index !== -1){
                 setProducts(products.splice(index, 1))
            } 
        }

    return(
        <AppContext.Provider 
            value={{                              
                products,
                addProduct,
                skuExists,
                deleteProduct,   
            }}
        >
            { children }           

        </AppContext.Provider>
    )
    
}