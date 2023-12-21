import { Divider } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useReducer } from "react";
import LineChartUrwertkarte from "./LineChartUrwertkarte";
import Grid from "@mui/material/Unstable_Grid2";
import { variables } from "../variables";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Pruefentscheid from "../pages/Pruefentscheid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function createInitialState() {
  const initialTodos = [];
  return {
    messwert: "",
    messwertlist: initialTodos,
  };
}
function reducer(state, action) {
  switch (action.type) {
    case "changed_messwert": {
      return {
        messwert: action.nextMesswert,
        messwertlist: state.messwertlist,
      };
    }
    case "added_messwert": {
      return {
        messwert: "",
        messwertlist: [
          ...state.messwertlist,
          {
            id: state.messwertlist.length,
            text: state.messwert,
          },
        ],
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}
export default function WEPruefung(username, props) {
  const [obereToleranz, setObereToleranz] = useState(0);
  const [untereToleranz, setUntereToleranz] = useState(0);
  const [messmittel, SetMessmittel] = useState(0);
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
  const [wenummer, setWENummer] = useState(username.selectedwelist.WENummer);
  const [artikelnummer, setArtikelnummer] = useState(
    username.selectedwelist.ArtikelNummer
  );
  const [artikelsuchbegriff, setArtikelsuchbegriff] = useState(
    username.selectedwelist.ArtikelSuchbegriff
  );
  const [pruefplannummer, setPruefplannummer] = useState(
    username.selectedwelist.PruefplanNummer
  );
  const [zeichnungsnummer, setZeichnungsnummer] = useState(
    username.selectedwelist.PruefplanZeichungsNummer
  );
  const [index, setIndex] = useState(
    username.selectedwelist.PruefplanZeichnungsIndex
  );
  const [stichprobenmenge, setStichprobenmenge] = useState(
    username.selectedwelist.AQLStichprobenmenge
  );
  const [isOpen, setIsOpen] = useState(false);
  const [countio, setCountio] = useState(0);
  const [countnio, setCountnio] = useState(0);
  const [countemesswerte, setCountemesswerte] = useState(0);
  const [wareneingangsposlist, seWareneingangsposlist] = useState();

  const getPruefplanPosList = useCallback(() => {
    fetch(variables.API_URL + "wareneingangspruefpositionen")
      .then((response) => response.json())
      .then((data) => {
        var weposlist = [];
        data.forEach((xwepositem) => {
          if (
            xwepositem.IDWareneingang == username.selectedwelist.IDWareneingang
          ) {
            weposlist.push(xwepositem);
          }
          seWareneingangsposlist(weposlist);
          setObereToleranz(weposlist[0].Oberetoleranz);
          setUntereToleranz(weposlist[0].Unteretoleranz);
        });
      });
  }, []);
  useEffect(() => {
    getPruefplanPosList();
  }, [getPruefplanPosList]);
  useEffect(() => {
    setIsOpen(ModalPruefentscheid(state.messwertlist));
  }, [state.messwertlist]);
  useEffect(() => {
    setCountio(CountGood(state.messwertlist));
  }, [state.messwertlist]);
  useEffect(() => {
    setCountnio(CountBad(state.messwertlist));
  }, [state.messwertlist]);
  useEffect(() => {
    setCountemesswerte(CountMesswerte(state.messwertlist));
  }, [state.messwertlist]);
  function ModalPruefentscheid(array) {
    if (array) {
      var countMesserte = CountMesswerte(array);
      if (countMesserte == stichprobenmenge) {
        return true;
      }
    }
  }
  function FindAverage(array) {
    var sum = 0;
    for (let index = 0; index < array.length; index++) {
      sum += parseFloat(array[index].text);
    }
    var avg = sum / array.length;
    return avg;
  }
  function Findminimum(array) {
    var minimum = 0;
    let minarray = [];
    for (let index = 0; index < array.length; index++) {
      minarray.push(parseFloat(array[index].text));
    }
    if (minarray) {
      minimum = Math.min(...minarray).toFixed(2);
    }
    return minimum;
  }
  function Findmaximum(array) {
    var maximum = 0;
    let maxarray = [];
    for (let index = 0; index < array.length; index++) {
      maxarray.push(parseFloat(array[index].text));
    }
    if (maxarray) {
      maximum = Math.max(...maxarray).toFixed(2);
    }
    return maximum;
  }
  function FindRange(array) {
    var maximum = Findmaximum(array);
    var minimum = Findminimum(array);
    var r = (maximum - minimum).toFixed(2);
    return r;
  }
  function CountGood(array) {
    var count = 0;
    for (let index = 0; index < array.length; index++) {
      if (
        parseFloat(array[index].text) < obereToleranz &&
        parseFloat(array[index].text) > untereToleranz
      ) {
        count = count + 1;
      }
    }
    return count;
  }
  function CountBad(array) {
    var count = 0;
    for (let index = 0; index < array.length; index++) {
      if (
        (parseFloat(array[index].text) >= obereToleranz) |
        (parseFloat(array[index].text) <= untereToleranz)
      ) {
        count = count + 1;
      }
    }
    return count;
  }
  function CountMesswerte(array) {
    var count = 0;
    for (let index = 0; index < array.length; index++) {
      count = count + 1;
    }
    return count;
  }
  const CardWEKopfdaten = (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          align="left"
        >
          Datenerfassung Prüfmerkmale
        </Typography>
        <Typography>
          <Grid container spacing={2} direction={"column"}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="WE-Nummer"
                  variant="filled"
                  fullWidth
                  value={wenummer}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Artikelnummer"
                  variant="filled"
                  fullWidth
                  value={artikelnummer}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Artikelsuchbegriff"
                  variant="filled"
                  fullWidth
                  value={artikelsuchbegriff}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Prüfplannummer"
                  variant="filled"
                  fullWidth
                  value={pruefplannummer}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Zeichnungsnummer"
                  variant="filled"
                  fullWidth
                  value={zeichnungsnummer}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Zeichnungsindex"
                  variant="filled"
                  fullWidth
                  value={index}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Stichprobenmenge"
                  variant="filled"
                  fullWidth
                  value={stichprobenmenge}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {wareneingangsposlist &&
                  wareneingangsposlist.map((item) => (
                    <TextField
                      id="outlined-basic"
                      label="Messmittel"
                      variant="filled"
                      fullWidth
                      value={item.Messmittel}
                    />
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
  const CardMesswerteingabe = (
    <Card sx={{ minHeight: 437 }}>
      {wareneingangsposlist &&
        wareneingangsposlist.map((item) => (
          <TextField
            key={item.id}
            label="Prüfmerkmal"
            variant="filled"
            value={item.Pruefmerkal}
            sx={{ marginTop: 1 }}
          ></TextField>
        ))}
      <Divider sx={{ marginTop: 1 }}></Divider>
      <Grid>
        <div>
          {wareneingangsposlist &&
            wareneingangsposlist.map((item) => (
              <FormHelperText id="outlined-weight-helper-text" key={item.id}>
                OT: {item.Oberetoleranz.toFixed(2)}
              </FormHelperText>
            ))}
          {/* <FormHelperText id="outlined-weight-helper-text">
            OT: {obereToleranz.toFixed(2)}
          </FormHelperText> */}
          {/* {wareneingangsposlist &&
            wareneingangsposlist.map((item) => (
              <FormHelperText id="outlined-weight-helper-text" key={item.id}>
                OT: {item.Oberetoleranz.toFixed(2)}
              </FormHelperText>
            ))} */}
          <TextField
            type="number"
            placeholder="Messwert"
            required
            autoFocus
            color=""
            variant="outlined"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              inputProps: { min: 0, max: 1000 },
              maxLength: 5,
              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
            }}
            value={state.messwert}
            onChange={(e) => {
              dispatch({
                type: "changed_messwert",
                nextMesswert: e.target.value,
              });
            }}
          />
          {wareneingangsposlist &&
            wareneingangsposlist.map((item) => (
              <FormHelperText id="outlined-weight-helper-text" key={item.id}>
                UT: {item.Unteretoleranz.toFixed(2)}
              </FormHelperText>
            ))}
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch({ type: "added_messwert" });
          }}
        >
          Speichern
        </Button>
        <FormHelperText>
          Messwert {CountMesswerte(state.messwertlist)} von {stichprobenmenge}
        </FormHelperText>
      </Grid>
      <Divider sx={{ marginTop: 1 }}></Divider>
      <CardContent>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          aria-label="contacts"
        >
          <ListItem disablePadding>
            <TextField
              value={Findminimum(state.messwertlist)}
              label="Minimum"
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mm</InputAdornment>
                ),
              }}
            ></TextField>
          </ListItem>
          <ListItem disablePadding>
            <TextField
              value={Findmaximum(state.messwertlist)}
              label="Maximum"
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mm</InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem disablePadding>
            <TextField
              value={FindRange(state.messwertlist)}
              label="Range"
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mm</InputAdornment>
                ),
              }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
  const CardLine = (
    <Card sx={{ minWidth: 1239 }}>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Urwertkarte
      </Typography>
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3, marginLeft: 10 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
            x̄
          </Avatar>
          <Typography noWrap>
            {FindAverage(state.messwertlist).toFixed(2)}
          </Typography>
          <Avatar sx={{ bgcolor: "#00c853", width: 24, height: 24 }}>G</Avatar>
          <Typography noWrap>{CountGood(state.messwertlist)}</Typography>
          <Avatar sx={{ bgcolor: "red", width: 24, height: 24 }}>S</Avatar>
          <Typography noWrap>{CountBad(state.messwertlist)}</Typography>
        </Stack>
      </Box>
      <LineChartUrwertkarte
        obereToleranz={obereToleranz}
        untereToleranz={untereToleranz}
        messwertlist={state.messwertlist}
        wareneingangsposlist={wareneingangsposlist}
        AnzahlMesswerte={state.id}
      ></LineChartUrwertkarte>
    </Card>
  );
  const rows = state.messwertlist;
  const CardMesswertTabelle1 = (
    <Card sx={4}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 275 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">{"Prüfmerkmal: Länge"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                style={
                  (row.text > obereToleranz) | (row.text < untereToleranz)
                    ? { background: "red" }
                    : { background: "#00c853" }
                }
              >
                <TableCell>Messwert: {row.id + 1}</TableCell>
                <TableCell> {row.text} mm</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
  return (
    <Box marginTop={-7} marginLeft={32}>
      <Grid container spacing={2} direction="column">
        <Grid item marginTop={1}>
          {CardWEKopfdaten}
        </Grid>
        <Grid>
          <Grid container spacing={1} direction="row">
            <Grid item sx={2}>
              {CardMesswerteingabe}
            </Grid>
            <Grid item sx={10}>
              {CardLine}
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={4}>
              {CardMesswertTabelle1}
            </Grid>
            <Grid item xs={4}>
              {/* <ColorBox
                bgcolor="primary.light"
                data={{ label: "Blue-50", color: "#E3F2FD" }}
                title="primary.light"
                dark
              /> */}
            </Grid>
          </Grid>
          <Pruefentscheid
            open={isOpen}
            OnClose={() => setIsOpen(false)}
            WENummer={username.selectedwelist.WENummer}
            AQLStichprobenmenge={username.selectedwelist.AQLStichprobenmenge}
            wareneingangsposlist={wareneingangsposlist}
            AQLAnnahmefehlermenge={
              username.selectedwelist.AQLAnnahmefehlermenge
            }
            AQLRueckweisungsfehlermenge={
              username.selectedwelist.AQLRueckweisungsfehlermenge
            }
            Countio={countio}
            Countnio={countnio}
            Countemesswerte={countemesswerte}
            Liefermengesoll={username.selectedwelist.LiefermengeSoll}
            Liefermengeist={username.selectedwelist.LiefermengeIst}
          ></Pruefentscheid>
        </Grid>
      </Grid>
    </Box>
  );
}
