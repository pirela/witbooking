import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { TypeHostData, TypeProyecto } from "../../types/types";

import { defProyecto } from "../../utils/const";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "30px",
  },
  paper: {
    padding: "30px",
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  paper2: {
    padding: "0px",
    textAlign: "left",
    color: "#000000",
    background: "#f5f5f5",
    fontSize: "35px",
    fontFamily: "helvetica",
    fontWeight: 600,
    display: "flex",
    lineHeight: "43px",
  },
  paper3: {
    padding: "4px 8px",
    textAlign: "left",
    color: "#000000",
    background: "#f5f5f5",
    fontSize: "18px",
    fontFamily: "helvetica",
    lineHeight: "22px",
    marginTop: "auto",
  },
  tituloItem: {
    textAlign: "left",
    color: "#000",
    fontSize: "16px",
    fontFamily: "helvetica",
    fontWeight: 600,
    lineHeight: "19px",
    marginBottom: "23px",
  },
  descriItem: {
    color: "#4A4A4A",
    fontSize: "16px",
    fontFamily: "helvetica",
    lineHeight: "19px",
  },
  cantItem: {
    color: "#4A4A4A62",
    fontSize: "13px",
    fontFamily: "helvetica",
    lineHeight: "19px",
  },
  txtTop: {
    textAlign: "right",
    color: "#4A4A4A62",
    fontSize: "12px",
    fontFamily: "helvetica",
    lineHeight: "19px",
  },
}));

export default function List({ data, limit = 5 }: TypeHostData) {
  const classes = useStyles();
  const [showList, setShowList] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [proyecto, setProyecto] = useState<TypeProyecto>(defProyecto);
  const [hostSelected, setHostSelected] = useState<string>("0");

  const handleCloseDialog = () => {
    setShowAlert(false);
  };

  const handleClickPryecto = (proyecto: TypeProyecto) => {
    setProyecto(proyecto);
    setShowAlert(true);
  };

  const getTopAppsByHost = (host: string) => {
    let flag = true;
    if (hostSelected !== "0" && host === hostSelected) {
      flag = true;
    }
    if (hostSelected !== "0" && host !== hostSelected) {
      flag = false;
    }
    return flag;
  };

  return (
    <>
      <div className={classes.root}>
        <Dialog
          open={showAlert}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Información completa del proyecto`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>{`Nombre: ${proyecto?.name}`}</div>
              <div>{`Apdex: ${proyecto?.apdex}`}</div>
              <div>{`Versión: ${proyecto?.version}`}</div>
              <div>{`Lista de host: ${(proyecto?.host || []).map(
                (host) => host
              )}`}</div>
              <div>{`Lista de contribuyentes: ${(
                proyecto?.contributors || []
              ).map((contribuyente) => contribuyente)}`}</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              Entendido
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Box display="flex">
              <div className={classes.paper2}>{"Apps by Host "}</div>
              <div className={classes.paper3}>
                {"for user averylongemailadress@companyname.com"}
              </div>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper3} elevation={0}>
              <Checkbox
                checked={showList}
                onChange={() => setShowList(!showList)}
                name="checkedB"
                color="primary"
              />
              {showList ? "Show as an awesome grid" : "Show as list"}
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {Object.keys(data).map((host) => (
            <>
              {getTopAppsByHost(host) && (
                <Grid item xs={showList ? 12 : 6}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item xs={9} className={classes.tituloItem}>
                        {host}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className={classes.txtTop}
                        onClick={() => {
                          setHostSelected(hostSelected === "0" ? host : "0");
                        }}
                      >
                        {`${
                          hostSelected === "0" ? "Show top 5" : "Show top 25"
                        } `}
                      </Grid>
                    </Grid>
                    {data[host]
                      .slice(0, hostSelected !== "0" ? 25 : limit)
                      .map((proyecto: TypeProyecto) => (
                        <Grid
                          container
                          spacing={3}
                          onClick={() => handleClickPryecto(proyecto)}
                        >
                          <Grid item xs={1}>
                            <div className={classes.cantItem}>
                              {proyecto.apdex}
                            </div>
                          </Grid>
                          <Grid item xs={11}>
                            <div className={classes.descriItem}>
                              {proyecto.name}
                            </div>
                          </Grid>
                        </Grid>
                      ))}
                  </Paper>
                </Grid>
              )}
            </>
          ))}
        </Grid>
      </div>
    </>
  );
}
