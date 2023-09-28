import { yupResolver } from '@hookform/resolvers/yup';
import { LockClockOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PasswordField from '../../FormControl/PasswordField';
import InputField from '../../FormControl/Textfield';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: '16px',
  },

  title: {
    textAlign: 'center',
    padding: '6px 0 4px 0',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: 'red',
  },

  submit: {
    marginTop: '2rem',
  },

  progress: {
    position: 'absolute',
    top: '1rem',
    left: 0,
    right: 0,
  },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object({
    identifier: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup.string().required('Please enter your password'),
  });

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (value) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(value);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockClockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
