import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo } from '@/toolkit/todoSlice';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../../styles/Buttons.module.css'

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todo);
  const dispatch = useDispatch();
  const gridRef = useRef(null); // Create a ref for the grid

  const gridOptions = {
    suppressHorizontalScroll: true,
    suppressCellFocus: true,
    domLayout: 'autoHeight',
  };

  const imageRenderer = (props) => {
    const imgSrc = props.value || '';
    return (
      <img
        src={imgSrc}
        alt="Todo"
        style={{ width: '100%', height: 'auto' }}
      />
    );
  };

  const statusRenderer = (params) => {
    return params.value ? 'Completed' : 'Not Completed';
  };

  const columnDefs = [
    { headerName: 'Title', field: 'title', flex: 1 },
    { headerName: 'Description', field: 'description', flex: 1 },
    { headerName: 'End Date', field: 'endDate', flex: 1 },
    {
      headerName: 'Status',
      field: 'isCompleted',
      cellRenderer: statusRenderer,
    },
    {
      headerName: 'Image',
      field: 'image',
      cellRenderer: imageRenderer,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      flex: 1,
      cellRenderer: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:"center" }}>
          <Link href={`/cms/Todos/${params.data.id}`}>
            <button class="btn">Edit</button>
          </Link>
          <button class="btn" onClick={() => dispatch(deleteTodo(params.data.id))}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const gridApi = gridRef.current?.api;

      if (gridApi) {
        if (window.innerWidth < 800) {
          gridApi.setColumnVisible('description', false);
        
          gridApi.setColumnVisible('image', false);
       
        } else {
          gridApi.setColumnVisible('description', true);
          gridApi.setColumnVisible('endDate', true);
          gridApi.setColumnVisible('image', true);
          gridApi.setColumnVisible('actions', true);
          gridApi.setColumnVisible('isCompleted', true);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gridOptions]);

  return (
    <>
    <h1 style={{textAlign:"center"}}> MyTodo APP</h1>
    
    <h3 style={{textAlign:"center"}}>
Add items for daily references and keeping yourself upto-date &nbsp; &nbsp;
 <Link href={'/cms/addTodos'}><button>Add Item</button></Link>
    </h3>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div className="ag-theme-alpine" style={{ width: '100%', maxWidth: '1200px', minHeight: '400px' }}>
        <AgGridReact
          ref={gridRef} // Attach the ref here
          gridOptions={gridOptions}
          rowData={todos}
          columnDefs={columnDefs}
          domLayout='autoHeight'
        />
      </div>
    </div>
  </>
  );
};

export default TodoList;
