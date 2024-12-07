import { Box, Button, Input, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack, CheckBox, CheckBoxOutlineBlank, DeleteForever, QuestionMark } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';

export default function ToDoList() {
  const [todoList, setTodoList] = useState([]);
  const [inputText, setInputText] = useState('');

  const onChange = useCallback((value) => {
    setInputText(value.length ? value : '');
  }, []);

  const onAdd = useCallback(() => {
    if (inputText.length) {
      const newTodo = { 'isCompleted': false, 'value': inputText  };
      setTodoList(prevState => [...prevState, newTodo]);
      setInputText('');
      document.getElementById('inputTodo').focus();
    }
  }, [inputText]);

  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
      case 'Enter':
        onAdd();
        break;
      default:
        break;
    }
  },[onAdd]);

  const onChecked = useCallback((index) => {
    setTodoList((prevState) => {
      const newTodoList = [...prevState];
      newTodoList[index].isCompleted = !newTodoList[index].isCompleted;
      return newTodoList;
    });
  }, []);

  const onRemove = useCallback((index) => {
    setTodoList((prevState) => {
      return prevState.filter((item, itemIndex) => (itemIndex !== index));
    });
  }, []);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('todoList'));
    if (savedList) {
      setTodoList(savedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    if (!todoList.length) {
      localStorage.removeItem('todoList');
    }
  }, [todoList]);

  return (
    <Box flex={4} p={2} minHeight={'calc(100vh - 97px)'}>
      <center>
        <Box sx={{
          display: 'flex',
          maxWidth: '500px',
          width: '100%',
          marginBottom: '20px',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between'
        }}>

          <Link to={'/projects'} sx={{}}>
            <Box sx={{ padding: '15px' }} >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <ArrowBack />
              </ListItemIcon>
            </Box>
          </Link>

          <Typography variant='h5' >
            {'Todo List'}
          </Typography>

          <Box sx={{ padding: '15px' }}>
            <QuestionMark />
          </Box>

        </Box>

        <Box sx={{
          display: 'flex',
          maxWidth: '500px',
          width: '100%',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between'
        }}>
          <TextField
            id='inputTodo'
            label='Add New Todo'
            variant='outlined'
            sx={{ width: '100%' }}
            value={inputText}
            autoComplete='off'
            onChange={(event) => onChange(event.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant='contained'
            sx={{
              height: '56px',
              width: '150px',
              marginLeft: '10px',
            }}
            onClick={onAdd}
          >
            {'Add'}
          </Button>
        </Box>
        <br/>
        <Box sx={{
          maxWidth: '400px',
          width: '100%',
        }}>
          <List sx={{ padding:0 }}>
            {todoList.map(({ isCompleted, value }, index) => (
              <ListItem key={index} sx={{ padding:0 }}>

                <Box sx={{ padding: '15px' }} onClick={() => onChecked(index)}>
                  {isCompleted ? <CheckBox/> :  <CheckBoxOutlineBlank/>}
                </Box>

                <Typography sx={{
                  width: '100%',
                  textDecoration: (isCompleted ? 'line-through' : 'none'),
                  textDecorationColor: 'rgba(78,177,118,0.7)',
                  textDecorationThickness: '2px',
                }}>
                  {value}
                </Typography>

                <Box sx={{ padding: '15px' }} onClick={() => onRemove(index)}>
                  <DeleteForever />
                </Box>

              </ListItem>
            ))}
          </List>
        </Box>
      </center>
    </Box>
  );
}