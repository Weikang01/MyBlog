import { useRef, useState } from "react";
import {
  Link,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Google as GoogleIcon } from "@mui/icons-material";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 405,
    margin: "auto",
    marginTop: theme.spacing(8),
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    margin: theme.spacing(0, 0, 2),
  },
}));

export default function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailDisable, setEmailDisable] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const [usernameDisable, setUsernameDisable] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [usernameHelperText, setUsernameHelperText] = useState<string>("");

  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordDisable, setPasswordDisable] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");

  const updateInput = (
    isDisable: boolean,
    isError: boolean,
    helperText: string
  ) => {
    if (isDisable) {
      setEmailDisable(true);
      setPasswordDisable(true);
    } else if (isError) {
      setEmailDisable(false);
      setEmailError(true);
      setEmailHelperText(helperText);
      setPasswordDisable(false);
      setPasswordError(true);
      setPasswordHelperText(helperText);
    } else {
      setEmailDisable(false);
      setEmailError(false);
      setEmailHelperText("");
      setPasswordDisable(false);
      setPasswordError(false);
      setPasswordHelperText("");
    }
  };

  const classes = useStyles();

  const handleSubmit = async (
    e: React.FormEvent,
    onStart: () => void,
    onComplete: () => void
  ) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      updateInput(false, true, "Email and Password are required.");
      return;
    }

    // Call the onStart callback
    onStart();

    // Handle login logic here
    const serverURL = import.meta.env.VITE_SERVER_URL;

    try {
      const response = await fetch(`${serverURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        switch (response.status) {
          case 401:
            const data = await response.json();
            updateInput(false, true, data.error);
            break;
          case 500:
            updateInput(false, true, "Server error, please try again later.");
            break;
          default:
            updateInput(false, true, "Unexpected error, please try again.");
            break;
        }
      } else {
        updateInput(false, false, "");
      }
    } catch (error: any) {
      if (error.status !== 401 && error.status !== 400) {
        console.error("Error:", error);
      }
      updateInput(false, true, "Server error, please try again later.");
    } finally {
      // Call the onComplete callback
      onComplete();
    }
  };

  const handleStart = () => {
    updateInput(true, false, "");
  };

  const handleComplete = () => {
    // Add additional actions to perform after the fetch request
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={emailRef}
                disabled={emailDisable}
                error={emailError}
                helperText={emailHelperText}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                inputRef={usernameRef}
                disabled={usernameDisable}
                error={usernameError}
                helperText={usernameHelperText}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
                disabled={passwordDisable}
                error={passwordError}
                helperText={passwordHelperText}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={(e) => handleSubmit(e, handleStart, handleComplete)}
              >
                Register
              </Button>
              <Button
                fullWidth
                variant="outlined"
                className={classes.googleButton}
                startIcon={<GoogleIcon />}
                onClick={() => {
                  // Handle Google login logic here
                }}
              >
                Register with Google
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
