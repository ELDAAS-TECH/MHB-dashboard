import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(10),
    
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));


const Login = ({ handleLogin }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(`Email: ${email}, Password: ${password}`);
  //   // TODO: Add logic to submit the form data to a server or validate it client-side
  //   handleLogin();
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the entered username and password match the desired values
    if (email === 'admin@myhomebeacon.com' && password === '123456') {
      // Login successful
      handleLogin();
      toast.success('Login successful');
    } else {
      // Invalid credentials
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              fullWidth
            >
              LOGIN
            </Button>
            <Button onClick={() => navigate('/signup')}>Not a user? Sign Up!!</Button>
          </form>
        </Paper>
      </Container>
      <ToastContainer /> {/* Add this component to show the toast messages */}
    </div>
  );
};

export default Login;
