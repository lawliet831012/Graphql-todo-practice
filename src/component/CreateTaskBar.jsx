import React, { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';

import { todoGQL } from '../gqls';
import useStyle from '../styles/components/CreateTaskBar.styles';

function CreateTaskBar() {
  const [todoValue, setTodoValue] = useState('');
  const classes = useStyle();

  const [addTodo] = useMutation(todoGQL.ADD_TODO, {
    refetchQueries: [{ query: todoGQL.TODO_QUERY }],
    awaitRefetchQueries: true
  });

  const onValueChange = useCallback((e) => {
    setTodoValue(e.target.value);
  }, []);

  const onAdd = useCallback(() => {
    addTodo({ variables: { task: todoValue } });
  }, [todoValue]);

  return (
    <div className={classes.container}>
      <TextField
        onChange={onValueChange}
        value={todoValue}
        fullWidth
        placeholder="add a new todo..."
        variant="outlined"
      />
      <Button onClick={onAdd} className={classes.button} variant="contained">
        Add
      </Button>
    </div>
  );
}

export default CreateTaskBar;
