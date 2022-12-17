import React, {useEffect, useMemo} from 'react';
import {Box, Button, Drawer, FormControl, styled, TextField, Typography} from "@mui/material";
import {Close} from "mdi-material-ui";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import generateClient from "../../../utils/axiosClient";

const client = generateClient();

const Header = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const defaultValues = {
  name: '',
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name')
});

const DisasterFormDrawer = (props) => {
  const {open, toggle, selectedDisaster, submitListener} = props

  const isEdit = useMemo(() => !!selectedDisaster, [selectedDisaster])

  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const handleClose = () => {
    toggle()
    reset(defaultValues)
  }

  const onSubmit = async (data) => {
    if (isEdit) {
      await handleUpdate(data)
    } else {
      await handleCreate(data)
    }
  }

  const handleCreate = async (data) => {
    try {
      await client.post('/disasters', {data})
      toast.success('Disaster created successfully')
      handleClose()
      await submitListener()
    } catch (e) {
      toast.error('Error creating disaster')
    }
  }

  const handleUpdate = async (data) => {
    try {
      await client.put(`/disasters/${selectedDisaster.id}`, {data})
      toast.success('Disaster updated successfully')
      handleClose()
      await submitListener()
    } catch (e) {
      toast.error('Error updating disaster')
    }
  }

  const onError = (errors) => {
    toast.error('Please fill all the fields')
    console.log(errors)
  }

  useEffect(() => {
    if (open) {
      if (isEdit) {
        reset({
          name: selectedDisaster.attributes.name
        })
      } else {
        reset(defaultValues)
      }
    }
  }, [isEdit, selectedDisaster, open])
  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{keepMounted: true}}
      sx={{'& .MuiDrawer-paper': {width: {xs: 300, sm: 400}}}}
    >
      <Header>
        <Typography variant='h6'>Create Disaster</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Header>
      <Box sx={{p: 5}}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormControl fullWidth sx={{marginBottom: 5}}>
            <Controller
              name='name'
              control={control}
              render={({field}) => (
                <TextField
                  {...field}
                  label='Name'
                  variant='outlined'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </FormControl>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Button size='large' type='submit' variant='contained' sx={{mr: 3}}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default DisasterFormDrawer;
