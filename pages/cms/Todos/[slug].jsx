import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo } from '@/toolkit/todoSlice';
import { useRouter } from 'next/router';
import { Button, Checkbox, FormControlLabel, Paper, TextField, Grid } from '@mui/material';


const EditTodoForm = () => {
    const { register, handleSubmit, setValue, formState:errors } = useForm();
    
    const dispatch = useDispatch();
    const router= useRouter();
    const {slug} = router.query;
    const todos = useSelector((state) => state.todos.todo);
    const todoToEdit = todos.find(todo => todo.id === slug);

    
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

    useEffect(() => {
     
            setValue('title', todoToEdit.title);
            setValue('description', todoToEdit.description);
            setValue('endDate', todoToEdit.endDate);
            setValue('isCompleted', todoToEdit.isCompleted);
            setValue('image', todoToEdit.image);
        
    }, [setValue]);

    const onSubmit = async(data) => {
        const base64Image = await convertToBase64(data.image[0]);
        const todotoEdit = {
            id:slug,
            title: data.title,
            description: data.description,
            endDate: data.endDate,
            isCompleted: !!data.isCompleted,
            image: base64Image,
        };
            dispatch(editTodo(todotoEdit)); 
            router.push('/cms/Todos');
      };
      
        
    

    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <input {...register('title', { required: true })} placeholder="Title" /> <br />
        //     <textarea {...register('description', { required: true })} placeholder="Description" /> <br />
        //     <input {...register('endDate', { required: true })} type="date" /> <br />
        //     <input {...register('image', { required: true })} type="file" /> <br />
        //     <label>
        //         <input type="checkbox" {...register('isCompleted')} /> <br />
        //         Completed
        //     </label>
        //     <button type="submit">Update Todo</button>
        // </form>
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
             label="End Date"
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

export default EditTodoForm;
