import React from "react";
import { useState } from "react";
import { variables } from "../variables";
import { useNavigate } from "react-router-dom";
import { TextField, Container, Paper, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function AQL() {
  const [responseData, setResponseData] = React.useState([]);
  const [Lieferlos, setLieferlos] = useState();
  const [Pruefniveau, setPruefniveau] = useState();
  const [Kennbuchstabe, setKennbuchstabe] = useState();
  const [AQL, setAQL] = useState();
  const [isPending, setisPending] = useState(false);
  const [noData, setnoData] = useState();
  const navigate = useNavigate();

  const handleAQL = (event) => {
    setAQL(event.target.value);
  };

  const handleKennbuchstabe = (event) => {
    setKennbuchstabe(event.target.value);
  };

  const handlePruefniveau = (event) => {
    setPruefniveau(event.target.value);
  };

  const handleAqlRequest = (e) => {
    e.preventDefault("Fail");
    const requeststore = {
      Lieferlos,
      Pruefniveau,
      Kennbuchstabe,
      AQL,
    };
    console.log(requeststore);
    setisPending(true);
    fetch(variables.API_URL + "aql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "/",
      },
      body: JSON.stringify(requeststore),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.forEach((xdata) => {
          if (xdata.ID != null) {
            setResponseData(data);
          }
        });
      });
    setisPending(false);
    alert(`You have get Data succesfull!`);
  };
  const cardEingabe = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
          AQL Kalkulator
        </Typography>
        <Typography>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Lieferlos"
                  variant="outlined"
                  fullWidth
                  value={Lieferlos}
                  onChange={(e) => setLieferlos(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">
                    Prüfniveau
                  </InputLabel>
                  <Select
                    align="left"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Pruefniveau}
                    label="Prüfniveau"
                    onChange={handlePruefniveau}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">
                    Kennbuchstabe
                  </InputLabel>
                  <Select
                    align="left"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Kennbuchstabe}
                    label="Kennbuchstabe"
                    onChange={handleKennbuchstabe}
                  >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                    <MenuItem value={"D"}>D</MenuItem>
                    <MenuItem value={"E"}>E</MenuItem>
                    <MenuItem value={"F"}>F</MenuItem>
                    <MenuItem value={"G"}>G</MenuItem>
                    <MenuItem value={"H"}>H</MenuItem>
                    <MenuItem value={"J"}>J</MenuItem>
                    <MenuItem value={"K"}>K</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"N"}>N</MenuItem>
                    <MenuItem value={"P"}>P</MenuItem>
                    <MenuItem value={"Q"}>Q</MenuItem>
                    <MenuItem value={"R"}>R</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">AQL</InputLabel>
                  <Select
                    align="left"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={AQL}
                    label="AQL"
                    onChange={handleAQL}
                  >
                    <MenuItem value={0.065}>0.065</MenuItem>
                    <MenuItem value={0.1}>0.1</MenuItem>
                    <MenuItem value={0.15}>0.15</MenuItem>
                    <MenuItem value={0.25}>0.25</MenuItem>
                    <MenuItem value={0.4}>0.4</MenuItem>
                    <MenuItem value={0.65}>0.65</MenuItem>
                    <MenuItem value={1.0}>1</MenuItem>
                    <MenuItem value={1.5}>1.5</MenuItem>
                    <MenuItem value={2.5}>1.5</MenuItem>
                    <MenuItem value={4.0}>4</MenuItem>
                    <MenuItem value={6.5}>6.5</MenuItem>
                    <MenuItem value={10.0}>10</MenuItem>
                    <MenuItem value={15.0}>15</MenuItem>
                    <MenuItem value={25.0}>25</MenuItem>
                    <MenuItem value={40.0}>40</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid item xs={12} sm={6} md={3}>
          <Stack direction="row" spacing={2}>
            {!isPending && (
              <Button variant="contained" onClick={handleAqlRequest}>
                Ermitteln
              </Button>
            )}
            {isPending && (
              <Button variant="contained">wird ermittelt....</Button>
            )}
          </Stack>
        </Grid>
      </CardActions>
    </React.Fragment>
  );
  const cardErgebnis = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
          Ergebnis
        </Typography>
        <Typography>
          <Grid container spacing={2}>
            {Array.from(responseData).map((xresponseData) => (
              <Grid item container spacing={2} key={xresponseData.ID}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="ID"
                    variant="outlined"
                    fullWidth
                    value={xresponseData.ID}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="Stichprobenmenge"
                    variant="outlined"
                    fullWidth
                    value={xresponseData.Stichprobenmenge}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="Annahmefehlermenge"
                    variant="outlined"
                    fullWidth
                    value={xresponseData.Annahmefehlermenge}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="Rueckweisungsfehlermenge"
                    variant="outlined"
                    fullWidth
                    value={xresponseData.Rueckweisungsfehlermenge}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid item xs={12} sm={6} md={3}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => navigate(0)}>
              Neue Kalkualtion
            </Button>
          </Stack>
        </Grid>
      </CardActions>
    </React.Fragment>
  );
  return (
    <>
      <Box marginTop={-7} marginLeft={32}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Card variant="outlined">{cardEingabe}</Card>
          </Grid>
          <Grid item>
            <Card variant="outlined">{cardErgebnis}</Card>
          </Grid>
          {noData && (
            <Alert severity="warning">
              This is a warning alert — check it out!
            </Alert>
          )}
        </Grid>
      </Box>
    </>
  );
}
export default AQL;
