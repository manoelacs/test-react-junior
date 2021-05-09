import DataTable from 'react-data-table-component';
import React, { useCallback, useRef, useState } from 'react';
import{ ArrowDownward, Delete, Add, Edit } from '@material-ui/icons';
import {Button, IconButton, Checkbox, } from '@material-ui/core/';

const data = [
    { id: 1, title: 'Conan the Barbarian', year: '1982' },
    { id: 2, title: 'Conan the Barbarian', year: '1983' },
    { id: 3, title: 'Alisson the Barbarian', year: '1985' }
];
const columns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      editable: true,
    },
    {
      name: 'Year',
      selector: 'year',
      sortable: true,
      editable: true,
    },
  ];
  
  const EditableCell = ({ row, index, column, col, onChange }: any) => {
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
    return row[column.selector];
  };
  
  const Table = () => {
    const [innerData, setInnerData] = useState(data);
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
            const index = data.findIndex(r => r.id === record.id);
      
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
        cell: (row: { id: number; }, index: any, column: any) => {
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
          cell: (row: { id: number; }) => {
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
        title="Movie List"
        columns={createColumns()}
        data={innerData}
        defaultSortField="title"
      />
    );
  }; export default Table;