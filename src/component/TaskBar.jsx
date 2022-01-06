import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useMutation } from '@apollo/client';

import { todoGQL } from '../gqls';
import useStyle from '../styles/components/TaskBar.styles';

function TaskBar({ todo = {} }) {
  const classes = useStyle();
  const { task, id, done } = todo;
  const [toggleTodo] = useMutation(todoGQL.TOGGLE_TODO, {
    variables: {
      id
    },
    refetchQueries: [{ query: todoGQL.TODO_QUERY }],
    awaitRefetchQueries: true
  });

  const [removeTodo] = useMutation(todoGQL.REMOVE_TODO, {
    variables: {
      id
    },
    refetchQueries: [{ query: todoGQL.TODO_QUERY }],
    awaitRefetchQueries: true
  });

  const onToggle = useCallback(() => {
    toggleTodo();
  }, []);

  const onDelete = useCallback(() => {
    removeTodo();
  }, []);

  return (
    <ListItemButton
      onClick={onToggle}
      className={done ? classes.done : classes.pending}
    >
      <CheckIcon />
      <ListItemText primary={task} />
      <IconButton onClick={onDelete} edge="end">
        <ClearIcon />
      </IconButton>
    </ListItemButton>
  );
}

TaskBar.propTypes = {
  todo: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default TaskBar;
