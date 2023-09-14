import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField({ name, label, form }) {
  const {
    control,
    formState: { errors },
  } = form;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!errors[name]}
          label={label}
          helperText={errors[name]?.message}
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
}

export default InputField;
