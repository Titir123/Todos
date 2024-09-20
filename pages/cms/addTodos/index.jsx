import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTodo } from '@/toolkit/todoSlice';
import { nanoid } from 'nanoid';
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField } from '@mui/material';
import { useRouter } from 'next/router';


const TodoForm = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const imageFile = watch('image');
    const dispatch = useDispatch();
    const router= useRouter();

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
              resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
      });
  };
  

    const onSubmit = async(data) => {
       
      const base64Image = await convertToBase64(data.image[0]);
            const todoData = {
                id:  nanoid(),
                title: data.title,
                description: data.description,
                endDate: data.endDate,
                isCompleted: !!data.isCompleted,
                image: base64Image,
            };
            
          
                dispatch(addTodo(todoData));
                router.push('/cms/Todos');
            
            reset();
          };

  

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '0 auto',
         }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('title', { required: 'Title is required' })}
              label="Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('description', { required: 'Description is required' })}
              label="Description"
              multiline
              rows={3}
              fullWidth
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('endDate', { required: 'End date is required' })}
             
              type="date"
              fullWidth
              
              error={!!errors.endDate}
              helperText={errors.endDate ? errors.endDate.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              {...register('image')}
              type="file"
              style={{ display: 'block', margin: '10px 0' }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox {...register('isCompleted')} />}
              label="Completed"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
    
    );
};

export default TodoForm;
