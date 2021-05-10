import DataTable from 'react-data-table-component';
import React, { useCallback, useRef, useState } from 'react';
import{ ArrowDownward, Delete, Add, Edit, Search } from '@material-ui/icons';
import {Button, IconButton, Select, MenuItem, FormControlLabel, Switch} from '@material-ui/core/';
import {mockProducts} from '../../shareds/mockProducts';
import { AppContext } from '../../contexts/AppContext';
import { TextField, ClearButton, ContainerForm} from './styles';


const actions = (
 <> 
   <IconButton
   color="primary"
 >
   <Add />
 </IconButton>
  <IconButton
  color="primary"
>
    <Search/>
</IconButton> </>
);
const data =  mockProducts
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
  const FilterComponent = ({ filterText, onFilter, onClear }:any) => (
    <>
      <TextField 
      id="search" 
      type="text" 
      placeholder="Busque pelo nome do produto" 
      aria-label="Search Input" 
      value={filterText} onChange={onFilter} />
      <ClearButton type="button" onClick={onClear}>Limpar</ClearButton>
    </>
  );
  const EditableCell = ({ row, index, column, col, onChange }: any) => {
    //console.log(row, column);
    const [value, setValue] = useState(row[column.selector]);

    const handleOnChange = (e: { target: { value: any; }; }) => {
      setValue(e.target.value);
      onChange?.(e);
    };
  
    if (column?.editing) {
      console.log(column?.editing, column, value)
      if(column.selector === 'category'){
        console.log('entrou no select')
        return(
            <Select
            /* labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper" */
               value={value}
            onChange={handleOnChange}
          >
            {/*  <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={"leite"}>Leite</MenuItem>
              <MenuItem value={"doce"}>Doce</MenuItem>
              <MenuItem value={"iogurte"}>Iogurte</MenuItem>
          </Select>

        )
      }
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
      console.log(row["category"].label);
      return row["category"].label;
    }   
    return row[column.selector];
  };
  
  const Table = () => {

    const {products, addProduct, skuExists, deleteProduct} = React.useContext(AppContext);
    const [innerData, setInnerData] = useState(products);
    const [editingId, setEditingId] = useState(-1);
    const [filterText, setFilterText] = useState('');
    const [theme, setTheme] = React.useState('default');

  const handleChange = () => {
    if (theme === 'dark') {
      setTheme('default');
    } else {
      setTheme('dark');
    }
  };
    const filteredItems = products.filter(
      item => item.productName && item.productName.toLowerCase().includes(filterText.toLowerCase()));
    
    let formData = useRef({}).current;
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setFilterText('');
          }
        };
    return <FilterComponent 
          onFilter={(e: { target: { value: React.SetStateAction<string>; }; }) =>
          setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
        }, [filterText]);

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
        if (window.confirm(`Você tem certeza que quer deletar o produto:\r ${record.id}?`)) {

            const index = innerData.findIndex(r => r.id === record.id);

            setInnerData([...innerData.slice(0, index), ...innerData.slice(index + 1)])
            deleteProduct(innerData[index].codeSku);
          }
        console.log(record.id);
    };
  
    const cancel = () => {
      setEditingId(-1);
    };
  
    const save = (row: any) => {
      const payload = { ...row, ...formData };
      const tempData = [...innerData];
      console.log(row, formData);
  
      
      const index = tempData.findIndex(row => editingId === row.id);
      if (index > -1) {
        
        const editRow = tempData[index];
        console.log(editRow);
        tempData.splice(index, 1, {
          ...editRow, 
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
          name: 'Ações',
          allowOverflow: true,
          minWidth: '200px',
          cell: (row: { id: any; }) => {
            const editable = isEditing(row);
            if (editable) {
              return (
                <div>
                  <button 
                  type="button" 
                  onClick={() => save(row)} 
                  style={{ backgroundColor: 'lightgreen', color:'black' }}>Salvar</button>

                  <button 
                  type="button" 
                  onClick={cancel} 
                  style={{ backgroundColor: 'orangered', color:'white' }}>Cancelar</button>
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
      <ContainerForm>
      <FormControlLabel
        label="Dark Mode" 
        control={(
          <Switch
          checked={theme === 'dark'}
          onChange={handleChange}
          />
        )}       
      />
      <DataTable
        title="Lista de Produtos"
        columns={createColumns()}
        data={filteredItems}
        defaultSortField="title"
       /*  actions={actions} */
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        contextActions= { <IconButton ><ArrowDownward/></IconButton>}
        theme={theme}
      />
      </ContainerForm>
    );
  }; export default Table;