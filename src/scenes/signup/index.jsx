import {useState} from 'react'
//import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

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
    gap: theme.spacing(2),
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

const SignUp = ({handleSignup}) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
      // TODO: Add logic to submit the form data to a server or validate it client-side
      handleSignup();
    };
    const navigate = useNavigate();

    return (
      <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              //required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              label="Username"
              variant="outlined"
              //required
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              //required
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
              onClick={()=>{navigate("/dashboard"); handleSignup(); }}
            >
              SIGNUP
            </Button>
        <Button onClick={()=>{navigate("/"); }}>Not a user SignUp!!</Button>
      </form>
      </Paper>
      </Container>
    </div>
    );
  
    {/*return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
  
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
  
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
  
        <Button onClick={()=>{navigate("/dashboard"); handleSignup(); }}>SignUp</Button>
        <Button onClick={()=>{navigate("/"); }}>Already signedup LOGIN!!!</Button>
        {/*<button type="submit">Signup</button>
      </form>
    );*/}
}

export default SignUp