import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText, OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField({ name, label, form, disabled }) {
  const {
    control,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <div>
      <FormControl error={!!errors[name]} fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          id={name}
          render={({ field: { ref, ...field } }) => (
            <OutlinedInput
              {...field}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              label={label}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default PasswordField;
