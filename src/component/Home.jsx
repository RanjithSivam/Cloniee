import React, { useEffect, useState } from 'react';
import Messenger from './Messenger';
import Login from './Login';
import Signup from './Signup';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const fakeAuth = {
  isAuthenticated: false,
  aboutuser: {},
  authenticate(cb) {
    setTimeout(cb, 100);
    this.isAuthenticated = true;
  },
  signout(cb) {
    setTimeout(cb, 100);
    this.isAuthenticated = false;
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btnMargin: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    textDecoration: 'none',
  },
  titleLink: {
    color: 'white',
    textDecoration: 'none',
  },
}));

function Home() {
  const [allow, setallow] = useState(false);
  const classes = useStyles();

  let signout = () => {
    auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fakeAuth.authenticate(() => {
          setallow(true);
        });
        fakeAuth.aboutuser = {
          displayName: user.displayName,
          email: user.email,
        };
      } else {
        db.collection('users').doc(fakeAuth.aboutuser.displayName).set(
          {
            status: false,
          },
          { merge: true }
        );
        fakeAuth.signout(() => {
          setallow(false);
        });
        fakeAuth.signout();
        fakeAuth.aboutuser = {};
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.btnMargin}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Cloniee
            </Link>
          </Typography>
          {!fakeAuth.isAuthenticated && (
            <>
              <Link to="/login" className={classes.links}>
                <Button color="default" variant="contained">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className={classes.links}>
                <Button color="default" variant="contained">
                  Signup
                </Button>
              </Link>
            </>
          )}
          {fakeAuth.isAuthenticated && (
            <Button color="default" variant="contained" onClick={signout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/login" component={() => <Login allow={allow} />} />
        <Route path="/signup" component={() => <Signup allow={allow} />} />
        <PrivateRoute
          path="/messenger"
          component={() => (
            <Messenger aboutuser={fakeAuth.aboutuser} isAuth={allow} />
          )}
        />
      </Switch>
    </div>
  );
}

export default Home;
