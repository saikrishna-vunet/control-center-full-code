import { Paper, Typography } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputText } from '../form-components/FormInputText';
import { FormInputMultiCheckbox } from '../form-components/FormMultiCheckbox';
import { FormInputRadio } from '../form-components/FormInputRadio';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';

interface IFormInput {
  name: string;
  description: string;
  Ipaddress: string;
  host_type: string;
  labels: string[];
  OS: string;
  number_of_cores: number;
  processor_type: string;
  memory: string;
  total_storage: string;
  storage: string;
  mount_point: string;
}

const defaultValues = {
  name: '',
  description: '',
  Ipaddress: '',
  host_type: '',
  labels: [],
  OS: '',
  number_of_cores: 0,
  processor_type: '',
  memory: '',
  total_storage: '',
  storage: '',
  mount_point: '',
};
const options = [
  {
    label: 'Web',
    value: 'Web',
  },
  {
    label: 'App',
    value: 'App',
  },
  {
    label: 'DB',
    value: 'DB',
  },
  {
    label: 'Common',
    value: 'Common',
  },
];
export const AddHosts = () => {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;

  const request_url = '/api/hosts/';
  const onSubmit = async (data: IFormInput) => {
    console.log(JSON.stringify(data));
    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: request_url,
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    alert('Host is successfully addded');

    window.location.reload();
  };

  return (
    <Paper
      style={{
        display: 'grid',
        gridRowGap: '20px',
        padding: '20px',
        margin: '10px 300px',
      }}
      elevation={3}
    >
      <Typography variant="h6">Add Host</Typography>

      <FormInputText name="name" control={control} label="Name of the host" />
      <FormInputText
        name="description"
        control={control}
        label="Description of the host"
      />
      <FormInputText name="Ipaddress" control={control} label="IP Address" />
      <FormInputText name="OS" control={control} label="Host OS" />
      <FormInputRadio
        name={'host_type'}
        control={control}
        label={'Type of host'}
        options={options}
      />

      <FormInputMultiCheckbox
        control={control}
        setValue={setValue}
        name={'labels'}
        label={'Labels'}
      />

      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormInputText
          name="number_of_cores"
          control={control}
          label="Number of cores"
        />
        <FormInputText name="memory" control={control} label="Memory" />
      </Box>
      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormInputText
          name="processor_type"
          control={control}
          label="Type of Processor"
        />
        <FormInputText
          name="total_storage"
          control={control}
          label="Total storage"
        />
      </Box>
      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormInputText
          name="storage"
          control={control}
          label="Mount point storage"
        />
        <FormInputText
          name="mount_point"
          control={control}
          label="Mount point"
        />
      </Box>

      <Stack direction="row" spacing={2} display="flex">
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Submit
        </Button>
        <Button onClick={() => reset()} variant="contained">
          Reset
        </Button>
      </Stack>
    </Paper>
  );
};
