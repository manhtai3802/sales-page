import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, FormHelperText, IconButton, OutlinedInput, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles(() => ({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    maxWidth: '200px',
    alignItems: 'center',
  },
}));

function QuantityField({ name, label, form, disabled }) {
  const classes = useStyles();
  const {
    control,
    setValue,
    formState: { errors },
  } = form;
  return (
    <div>
      <FormControl error={!!errors[name]} fullWidth margin="normal" variant="outlined" size="small">
        <Typography>{label}</Typography>
        <Controller
          name={name}
          control={control}
          render={({ field: { name, value, onChange, onBlur, ref, ...field } }) => (
            <Box className={classes.box}>
              <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
                <RemoveCircleOutline />
              </IconButton>

              <OutlinedInput
                id={name}
                {...field}
                fullWidth
                type="number"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
              />

              <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
                <AddCircleOutline />
              </IconButton>
            </Box>
          )}
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default QuantityField;
