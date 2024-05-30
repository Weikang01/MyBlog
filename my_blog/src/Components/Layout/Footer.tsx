import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(8),
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
  },
}));

interface FooterProps {
  description: string;
  title: string;
  url: string;
}

const Footer: React.FC<FooterProps> = ({ description, title, url }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body2">
            {"Copyright © "}
            <Link color="inherit" href={url}>
              {title}
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
