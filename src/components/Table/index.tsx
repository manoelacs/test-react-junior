import DataTable from 'react-data-table-component';
import React, { useCallback, useRef, useState } from 'react';
import{ ArrowDownward, Delete, Add, Edit } from '@material-ui/icons';
import {Button, IconButton, Checkbox, } from '@material-ui/core/';
import {mockProducts} from '../../shareds/mockProducts';
import { AppContext } from '../../contexts/AppContext';


const actions = (
  <IconButton
    color="primary"
  >
    <Add />
  </IconButton>
);
const data =  mockProducts//[
 /*  { id: 1, 
    codeSku: 768,
    productName: 'leite camila',
    price: '5,99',
    category: { label: 'leite', value: 'Leite'} ,
  },
  { id: 2,
    codeSku: 763,
    productName: 'leite molico',
    price: '5,00',
    category: { label: 'leite', value: 'Leite'} ,
  },
  { id: 3,
    codeSku: 758,
    productName: 'leite itambé',
    price: '5,59',
    category: { label: 'leite', value: 'Leite'} ,
  }, */
   /*  { id: 1, title: 'Conan the Barbarian', year: '1982' },
    { id: 2, title: 'Conan the Barbarian', year: '1983' },
    { id: 3, title: 'Alisson the Barbarian', year: '1985' } */
/* ]; */
const columns = [
    {
      name: 'SKU',
      selector: 'codeSku',
      sortable: true,
      editable: true,
    },
    {
      name: 'Nome',
      selector: 'productName',
      sortable: true,
      editable: true,
    },
    {
      name: 'Preço',
      selector: 'price',
      sortable: true,
      editable: true,
    },
    {
      name: 'Categoria',
      selector: 'category',
      sortable: true,
      editable: true,
    },
    
  ];
  
  const EditableCell = ({ row, index, column, col, onChange }: any) => {
    //console.log(row, column);
    const [value, setValue] = useState(row[column.selector]);

    const handleOnChange = (e: { target: { value: any; }; }) => {
      setValue(e.target.value);
      onChange?.(e);
    };
  
    if (column?.editing) {
      return (
        <input
          type={column.type || 'text'}
          name={column.selector}
          style={{ width: '100%' }}
          onChange={handleOnChange}
          value={value}
        />
      );
    }
  
    if (col.cell) {
      return col.cell(row, index, column);
    }
    if(column.selector === "category"){
      console.log(row["category"].value);
      return row["category"].value;
    }   
    return row[column.selector];
  };
  
  const Table = () => {
    const {products, addProduct, skuExists, deleteProduct} = React.useContext(AppContext);
    const [innerData, setInnerData] = useState(products);
    const [editingId, setEditingId] = useState(-1);
    let formData = useRef({}).current;
    const isEditing = (record: { id: number; }) => record.id === editingId;
  
    const formOnChange = (event: { target: { name: any; value: any; }; }) => {
      const nam = event.target.name;
      const val = event.target.value;
  
      formData = {
        ...formData,
        [nam]: val,
      };
    };
  
    const edit = (record: { id: any; }) => {
      setEditingId(record.id);
    };
    const deleteRow = (record: { id: any; }) => {
        if (window.confirm(`Are you sure you want to delete:\r ${record.id}?`)) {
            //const { data } = this.state;
            const index = innerData.findIndex(r => r.id === record.id);
            setInnerData([...innerData.slice(0, index), ...innerData.slice(index + 1)])
            deleteProduct(innerData[index].codeSku);
           /*  this.setState(state => ({
              toggleCleared: !state.toggleCleared,
              data: [...state.data.slice(0, index), ...state.data.slice(index + 1)],
            })); */
          }
        console.log(record.id);
    };
  
    const cancel = () => {
      setEditingId(-1);
    };
  
    const save = (item: any) => {
      const payload = { ...item, ...formData };
      const tempData = [...innerData];
  
      
      const index = tempData.findIndex(item => editingId === item.id);
      if (index > -1) {
        
        const item = tempData[index];
        tempData.splice(index, 1, {
          ...item, 
          ...payload,
        });
        setEditingId(-1);
        setInnerData(tempData);
      }
    };
  
    const mergedColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        cell: (row: { id: any; }, index: any, column: any) => {
          const editing = isEditing(row);
          return (
            <EditableCell
              row={row}
              index={index}
              column={{ ...column, editing }}
              col={col}
              onChange={formOnChange}
            />
          );
        },
      };
    });
  
    const createColumns = useCallback(() => {
      return [
        ...mergedColumns,
        {
          name: 'Actions',
          allowOverflow: true,
          minWidth: '200px',
          cell: (row: { id: any; }) => {
            const editable = isEditing(row);
            if (editable) {
              return (
                <div>
                  <button type="button" onClick={() => save(row)} style={{ backgroundColor: 'lightgreen' }}>save</button>
                  <button type="button" onClick={cancel} style={{ backgroundColor: 'orangered' }}>cancel</button>
                </div>
              );
            }
            return ( 
                <div>
                    <IconButton color="primary" onClick={() => edit(row)} >
                        <Edit/>
                     </IconButton>                         
                    <IconButton color="secondary" onClick={() => deleteRow(row)}>
                        <Delete/>
                    </IconButton>

                </div>)
             
          },
        },
      ];
    }, [mergedColumns]);
  
    return (
      <DataTable
        title="Lista de Produtos"
        columns={createColumns()}
        data={innerData}
        defaultSortField="title"
        actions={actions}
      />
    );
  }; export default Table;