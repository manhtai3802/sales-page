import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import QuantityField from 'components/FormControl/QuantityField';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCardForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCardForm({ onSubmit = null }) {
  const schema = yup.object({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum values is 1')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (value) => {
    if (onSubmit) {
      await onSubmit(value);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button type="submit" variant="contained" color="primary" style={{ width: '250px' }} fullWidth>
        Add to card
      </Button>
    </form>
  );
}

export default AddToCardForm;
