import React, {useEffect, useMemo} from 'react';
import {Autocomplete, Box, Button, Drawer, FormControl, styled, TextField, Typography} from "@mui/material";
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
  coordinators: [],
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  coordinators: yup.array().label('Coordinators'),
});

const DisasterFormDrawer = (props) => {
  const {open, toggle, selectedDisaster, submitListener} = props

  const [users, setUsers] = React.useState([]);

  const isEdit = useMemo(() => !!selectedDisaster, [selectedDisaster])

  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
    watch
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })

  console.log({watch: watch(), users})
  const handleClose = () => {
    toggle()
    reset(defaultValues)
  }

  const onSubmit = async (data) => {
    const transformedData = {
      name: data.name,
      coordinators: data.coordinators.map((coordinator) => coordinator.id),
    }

    if (isEdit) {
      await handleUpdate(transformedData)
    } else {
      await handleCreate(transformedData)
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
          name: selectedDisaster.attributes.name,
          coordinators: selectedDisaster.attributes.coordinators.data.map((coordinator) => ({id: coordinator.id, ...coordinator.attributes})),
        })
      } else {
        reset(defaultValues)
      }
    }
  }, [isEdit, selectedDisaster, open])

  useEffect(() => {
    (async () => {
      const response = await client.get('/users')
      setUsers(response.data)
    })()
  }, [])
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
          <FormControl fullWidth sx={{marginBottom: 5}}>
            <Controller
              name='coordinators'
              control={control}
              render={({field}) => (
                <Autocomplete
                  value={field.value}
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                  }}
                  options={users}
                  multiple
                  disableCloseOnSelect
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.username}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Coordinators'
                      variant='outlined'
                      fullWidth
                      error={!!errors.coordinators}
                      helperText={errors.coordinators?.message}
                    />
                  )}
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
