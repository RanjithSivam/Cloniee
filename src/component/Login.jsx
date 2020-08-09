import React, { useState } from 'react';
import { auth } from './firebase';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loging, setloging] = useState(false);
  const classes = useStyles();

  let loginUser = (event) => {
    setloging(true);
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setloging(false);
      })
      .catch((err) => {
        alert(err);
        setloging(false);
      });
  };

  if (props.allow) {
    return <Redirect to="/messenger" push={true} />;
  } else {
    return (
      <div className="login_form">
        {loging && <CircularProgress className="loader" />}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <form className={classes.form} noValidate onSubmit={loginUser}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
