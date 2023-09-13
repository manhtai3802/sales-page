import { yupResolver } from '@hookform/resolvers/yup';
import { LockClockOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PasswordField from '../PasswordField';
import InputField from '../Textfield';

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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object({
    fullName: yup
      .string()
      .required('Please enter your full name')
      .test('should has at least two words', 'Please enter least two words', (value) => {
        return value.split(' ').length >= 2;
      }),

    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 charter'),
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Password dose not match'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
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
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
