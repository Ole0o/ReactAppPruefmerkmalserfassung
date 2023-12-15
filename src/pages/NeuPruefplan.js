import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../variables";
import "../styles.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { TextField } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

const CONTAINERLAYER = {
  position: "fixed",
  top: "6%",
  left: "75%",
  right: "0%",
  bottom: "0%",
  transform: "translate(-0%, -0%,)",
  backgroundColor: "#fff",
  padding: "10px",
  zIndex: 1000,
  borderRadius: "8px",
};
const OYERLAYERSTYLES = {
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
export default function NeuPruefplan({ open, children, OnClose }) {
  const [ID, setID] = useState();
  const [Nummer, setNummer] = useState();
  const [Bezeichnung1, setBezeichnung1] = useState();
  const [Version, setVersion] = useState("1");
  const [Statuspruefplan, setStatuspruefplan] = useState("Gesperrt");
  const [isPending, setisPending] = useState(false);
  const navigate = useNavigate();
  if (!open) return null;
  const handleThrow = (e) => {
    setID("");
    setNummer("");
    setBezeichnung1("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const postSubmit = {
      ID,
      Nummer,
      Bezeichnung1,
      Version,
      Statuspruefplan,
    };
    console.log(postSubmit);
    setisPending(true);
    fetch(variables.API_URL + "pruefplan", {
      method: "POST",
      headers: {
        //dataTyp: "json",
        // "Content-Typ": "application/json",
        // mode: "no-cors",
        "Content-Type": "application/json",
        accept: "/",
      },
      body: JSON.stringify(postSubmit),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong by writing Data...");
      }
      setisPending(false);
      console.log("gespeichert");
      alert(`You have insert succesfull!`);
      navigate(0);
    });
  };
  return (
    <>
      <div style={OYERLAYERSTYLES}></div>
      <div style={CONTAINERLAYER}>
        <Grid container spacing={2} direction="row" marginTop={2}>
          <Grid item marginTop={1}>
            <Button onClick={OnClose} variant="contained" size="small">
              <KeyboardArrowLeft />
              Zurück
            </Button>
          </Grid>
          <Grid item>
            <Typography
              sx={{ fontSize: 30 }}
              color="text.secondary"
              gutterBottom
            >
              Neuanlage Prüfplan
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl disabled variant="standard">
              <InputLabel htmlFor="component-disabled">
                Prüfplanversion
              </InputLabel>
              <Input id="component-disabled" defaultValue={Version} />
              <FormHelperText> </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl disabled variant="standard">
              <InputLabel htmlFor="component-disabled">Status</InputLabel>
              <Input id="component-disabled" defaultValue={Statuspruefplan} />
              <FormHelperText> </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Prüfplannummer"
              variant="outlined"
              fullWidth
              value={Nummer}
              onChange={(e) => setNummer(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Prüfplanbezeichnung"
              variant="outlined"
              fullWidth
              value={Bezeichnung1}
              onChange={(e) => setBezeichnung1(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2} direction={"row"}>
              {!isPending && (
                <Button variant="contained" onClick={handleSubmit}>
                  Anlegen
                </Button>
              )}
              {isPending && (
                <Button variant="contained">wird angelegt....</Button>
              )}
              <Button variant="contained" onClick={handleThrow}>
                Verwerfen
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
