import React, { useState, useEffect, useCallback, useRef } from "react";
import { variables } from "../variables";
import { useNavigate } from "react-router-dom";
import PruefplanPositionen from "./PruefplanPositionen";
import PreufplanPosList from "../components/PruefplanPosList";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PruefplanArtikelMap from "./PruefplanArtikelMap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export function PreufplanDetails(props) {
  const [ID, setID] = useState(props.selectedPreufplan.ID);
  const [Nummer, setNummer] = useState(props.selectedPreufplan.Nummer);
  const [Bezeichnung1, setBezeichnung1] = useState(
    props.selectedPreufplan.Bezeichnung1
  );
  const [LieferantenNummer, setLieferantenNummer] = useState(
    props.selectedPreufplan.LieferantenNummer
  );
  const [LieferantenSuchbegriff, setLieferantenSuchbegriff] = useState(
    props.selectedPreufplan.LieferantenSuchbegriff
  );
  const [PruefBereich, setPruefBereich] = useState(
    props.selectedPreufplan.PruefBereich
  );
  const [ZeichungsNummer, setZeichungsNummer] = useState(
    props.selectedPreufplan.ZeichungsNummer
  );
  const [ZeichnungsIndex, setZeichnungsIndex] = useState(
    props.selectedPreufplan.ZeichnungsIndex
  );
  const [DatumVon, setDatumVon] = useState(props.selectedPreufplan.DatumVon);
  const [DatumBis, setDatumBis] = useState(props.selectedPreufplan.DatumBis);
  const [Pruefart, setPruefart] = useState(props.selectedPreufplan.Pruefart);
  const [Kennbuchstabe, setKennbuchstabe] = useState(
    props.selectedPreufplan.Kennbuchstabe
  );
  const [Pruefplatz, setPruefplatz] = useState(
    props.selectedPreufplan.Pruefplatz
  );
  const [Pruefniveau, setPruefniveau] = useState(
    props.selectedPreufplan.Pruefniveau
  );
  const [AQL, setAQL] = useState(props.selectedPreufplan.AQL);
  const [PhtotFileName, setPhtotFileName] = useState(
    props.selectedPreufplan.PhtotFileName
  );
  const [isPending, setisPending] = useState(false);
  const [isPendingDelete, setisPendingDelete] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [Version, setVersion] = useState(props.selectedPreufplan.Version);
  const [Statuspruefplan, setStatuspruefplan] = useState(
    props.selectedPreufplan.Statuspruefplan
  );
  const [Freigabebemerkung, setFreigabebemerkung] = useState(
    props.selectedPreufplan.Freigabebemerkung
  );
  const [PersonFreigabe, setPersonFreigabe] = useState(
    props.selectedPreufplan.PersonFreigabe
  );
  const [DatumFreigabe, setDatumFreigabe] = useState(
    props.selectedPreufplan.DatumFreigabe
  );
  const navigate = useNavigate();
  const [isOpenPAM, setisOpenPMA] = useState(false);
  const handleCancle = () => {
    navigate(0);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAQL = (event) => {
    setAQL(event.target.value);
  };

  const handleKennbuchstabe = (event) => {
    setKennbuchstabe(event.target.value);
  };

  const handlePruefniveau = (event) => {
    setPruefniveau(event.target.value);
  };

  const handleStatus = (event) => {
    setStatuspruefplan(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postSubmit = {
      ID,
      Nummer,
      Bezeichnung1,
      LieferantenNummer,
      LieferantenSuchbegriff,
      PruefBereich,
      ZeichungsNummer,
      ZeichnungsIndex,
      DatumVon,
      DatumBis,
      Pruefart,
      Kennbuchstabe,
      Pruefplatz,
      Pruefniveau,
      AQL,
      Version,
      PhtotFileName,
      Statuspruefplan,
      PersonFreigabe,
      DatumFreigabe,
      Freigabebemerkung,
    };
    console.log(postSubmit);
    setisPending(true);
    fetch(variables.API_URL + "pruefplan", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "/",
      },
      body: JSON.stringify(postSubmit),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong by updating Data...");
      }

      setisPending(false);
      console.log("gespeichert");
      alert(`You have updated succesfull!`);
      navigate(0);
    });
  };
  //SQL_Delete Tabelle Prüfplan
  const handleDelete = (e) => {
    e.preventDefault();
    setisPendingDelete(true);
    const url =
      variables.API_URL + "pruefplan" + "/" + props.selectedPreufplan.ID;
    console.log(url);
    fetch(url, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      navigate(0);
      setisPendingDelete(false);
      alert(`You have deleted succesfull!`);
    });
    setisPendingDelete(false);
  };

  // const FreigabeButton = styled(Switch)(({ theme }) => ({
  //   padding: 8,
  //   "& .MuiSwitch-track": {
  //     borderRadius: 22 / 2,
  //     "&:before, &:after": {
  //       content: '""',
  //       position: "absolute",
  //       top: "50%",
  //       transform: "translateY(-50%)",
  //       width: 16,
  //       height: 16,
  //     },
  //     "&:before": {
  //       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
  //         theme.palette.getContrastText(theme.palette.primary.main)
  //       )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
  //       left: 12,
  //     },
  //     "&:after": {
  //       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
  //         theme.palette.getContrastText(theme.palette.primary.main)
  //       )}" d="M19,13H5V11H19V13Z" /></svg>')`,
  //       right: 12,
  //     },
  //   },
  //   "& .MuiSwitch-thumb": {
  //     boxShadow: "none",
  //     width: 16,
  //     height: 16,
  //     margin: 2,
  //   },
  // }));

  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      {props.selectedPreufplan.Nummer}
    </Typography>,
    <Typography key="3" color="text.primary">
      Versionsstand: {props.selectedPreufplan.Version}
    </Typography>,
    <Typography key="3" color="text.primary">
      Status: {props.selectedPreufplan.Statuspruefplan}
    </Typography>,
  ];

  const rowbackgroundcolors = {
    Gesperrt: "#ef5350",
    Freigabe: "lightgreen",
  };

  const cardFreigabe = (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          align="left"
        >
          Freigabe Prüfplan
        </Typography>
        <Typography>
          <Grid container spacing={2} direction={"column"}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    align="left"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Statuspruefplan}
                    label="Status"
                    onChange={handleStatus}
                    sx={{
                      backgroundColor:
                        rowbackgroundcolors[Statuspruefplan] ?? "fff",
                    }}
                  >
                    <MenuItem value={"Freigabe"}>Freigabe</MenuItem>
                    <MenuItem value={"Gesperrt"}>Gesperrt</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Person Freigabe"
                  variant="outlined"
                  fullWidth
                  value={PersonFreigabe}
                  onChange={(e) => setPersonFreigabe(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Datum Freigabe"
                      value={dayjs(DatumFreigabe)}
                      onChange={(newValue) => setDatumFreigabe(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={3} sm={6} md={12}>
                  <TextField
                    id="outlined-basic"
                    label="Bemerkung"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={Freigabebemerkung}
                    onChange={(e) => setFreigabebemerkung(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
  const cardpreufplandetails = (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          align="left"
        >
          Basisdaten
        </Typography>
        <Typography>
          <Grid container spacing={2} direction={"column"}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="ID"
                  variant="outlined"
                  fullWidth
                  value={ID}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Nummer"
                  variant="outlined"
                  fullWidth
                  value={Nummer}
                  onChange={(e) => setNummer(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Bezeichnung1"
                  variant="outlined"
                  fullWidth
                  value={Bezeichnung1}
                  onChange={(e) => setBezeichnung1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Lieferantennummer"
                  variant="outlined"
                  fullWidth
                  value={LieferantenNummer}
                  onChange={(e) => setLieferantenNummer(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Suchbegriff"
                  variant="outlined"
                  fullWidth
                  value={LieferantenSuchbegriff}
                  onChange={(e) => setLieferantenSuchbegriff(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Prüfbereich"
                  variant="outlined"
                  fullWidth
                  value={PruefBereich}
                  onChange={(e) => setPruefBereich(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Zeichnungsnummer"
                  variant="outlined"
                  fullWidth
                  value={ZeichungsNummer}
                  onChange={(e) => setZeichungsNummer(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Zeichnungsindex"
                  variant="outlined"
                  fullWidth
                  value={ZeichnungsIndex}
                  onChange={(e) => setZeichnungsIndex(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="DatumVon"
                  variant="outlined"
                  fullWidth
                  value={DatumVon}
                  onChange={(e) => setDatumVon(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="DatumBis"
                  variant="outlined"
                  fullWidth
                  value={DatumBis}
                  onChange={(e) => setDatumBis(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Prüfart"
                  variant="outlined"
                  fullWidth
                  value={Pruefart}
                  onChange={(e) => setPruefart(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Prüfplatz"
                  variant="outlined"
                  fullWidth
                  value={Pruefplatz}
                  onChange={(e) => setPruefplatz(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
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
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={1.5}>1.5</MenuItem>
                    <MenuItem value={2.5}>1.5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={6.5}>6.5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="outlined-basic"
                  label="Version"
                  variant="outlined"
                  fullWidth
                  value={Version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={4}>
              <Grid item xs={12} sm={8} md={4}>
                <Stack direction="row" spacing={1}>
                  {!isPending && (
                    <Button variant="contained" onClick={handleSubmit}>
                      Speichern
                    </Button>
                  )}
                  {isPending && (
                    <Button variant="contained">wird gespeichert....</Button>
                  )}
                  {!isPendingDelete && (
                    <Button onClick={handleDelete} variant="contained">
                      Löschen
                    </Button>
                  )}
                  {isPendingDelete && (
                    <Button onClick={handleDelete} variant="contained">
                      Wird gelöscht...
                    </Button>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={8} md={4}>
                <Button onClick={() => setisOpen(true)} variant="contained">
                  Position hinzufügen
                </Button>
              </Grid>
              <Grid item xs={12} sm={8} md={4}>
                <Button onClick={() => setisOpenPMA(true)} variant="contained">
                  Artikel hinzufügen
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
  return (
    <>
      <Box marginTop={-7} marginLeft={32}>
        <Grid container spacing={2} direction="row" marginTop={2}>
          <Grid item marginTop={1}>
            <Button onClick={handleCancle} variant="contained" size="small">
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
              Prüfplanung Verwaltung
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="column">
          <Grid itemv ariant="outlined" marginBottom={2} marginTop={5}>
            <Stack spacing={2}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Grid>
          <Grid itemv ariant="outlined">
            {cardFreigabe}
          </Grid>
          <Grid itemv ariant="outlined" marginTop={2}>
            {cardpreufplandetails}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Grid>
            <PruefplanPositionen
              open={isOpen}
              OnClose={() => setisOpen(false)}
              xIDPruefplan={ID}
            ></PruefplanPositionen>
          </Grid>
          <Grid>
            <PreufplanPosList
              // preufplanposList={preufplanposList}
              xIDPruefplan={ID}
            />
          </Grid>
        </Grid>
        <PruefplanArtikelMap
          open={isOpenPAM}
          OnClosePMA={() => setisOpenPMA(false)}
          xIDPruefplan={ID}
          XPruefplannummerNummer={Nummer}
        ></PruefplanArtikelMap>
      </Box>
    </>
  );
}
export default PreufplanDetails;
