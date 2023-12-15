import React from "react";
import { useState, useEffect } from "react";
import { variables } from "../variables";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Box, Card, CardContent, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function PruefplanPositionen({
  open,
  OnClose,
  props,
  xIDPruefplan,
}) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  const [ID, setID] = useState();
  const [IDPruefplan, setIDPruefplan] = useState(xIDPruefplan);
  const [Positionsnummer, setPositionsnummer] = useState();
  const [Pruefmerkal, setPruefmerkal] = useState();
  const [Merkmalsart, setMerkmalsart] = useState();
  const [Kurzel, setKurzel] = useState();
  const [Bezeichnung1, setBezeichnung1] = useState();
  const [Bezeichnung2, setBezeichnung2] = useState();
  const [Bezeichnung3, setBezeichnung3] = useState();
  const [BezeichnungT, setBezeichnungT] = useState();
  const [Nennmaß, setNennmaß] = useState();
  const [Maßeinheit, setMaßeinheit] = useState();
  const [Oberetoleranz, setOberetoleranz] = useState();
  const [Unteretoleranz, setUnteretoleranz] = useState();
  const [DatumNeu, setDatumNeu] = useState(formattedDate);
  const [DatumEdit, setDatumEdit] = useState();
  const [Messmittel, SetMessmittel] = useState();
  const [isPending, setisPending] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleMerkmalsart = (event) => {
    setMerkmalsart(event.target.value);
  };

  useEffect(() => {
    setExpanded(OpenAccordion(Merkmalsart));
  }, [Merkmalsart]);

  function OpenAccordion(value) {
    if (value == "variabel") {
      return true;
    }
  }
  if (!open) return null;

  const handleSubmitPruefPos = (e) => {
    e.preventDefault();
    debugger;
    const postSubmitPruefPos = {
      ID,
      IDPruefplan,
      Positionsnummer,
      Pruefmerkal,
      Merkmalsart,
      Kurzel,
      Bezeichnung1,
      Bezeichnung2,
      Bezeichnung3,
      BezeichnungT,
      Nennmaß,
      Maßeinheit,
      Oberetoleranz,
      Unteretoleranz,
      DatumNeu,
      DatumEdit,
      Messmittel,
    };
    console.log(postSubmitPruefPos);
    fetch(variables.API_URL + "pruefplanpos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "/",
      },
      body: JSON.stringify(postSubmitPruefPos),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong by writing Data...");
      }
      setisPending(false);
      console.log(postSubmitPruefPos);
      alert(`You have insert succesfull!`);
      navigate(null);
    });
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const CardPruefplanPos = (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Anlage
        </Typography>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="IDPREUFPLAN"
                variant="outlined"
                fullWidth
                value={IDPruefplan}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="Positionssnummer"
                variant="outlined"
                fullWidth
                value={Positionsnummer}
                onChange={(e) => setPositionsnummer(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="Prüfmerkmal"
                variant="outlined"
                fullWidth
                value={Pruefmerkal}
                onChange={(e) => setPruefmerkal(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Merkmalsart
                </InputLabel>
                <Select
                  align="left"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Merkmalsart}
                  label="Merkmalsart"
                  defaultValue={"attributiv"}
                  onChange={handleMerkmalsart}
                >
                  <MenuItem value={"variabel"}>variabel</MenuItem>
                  <MenuItem value={"attributiv"}>attributiv</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="Kürzel"
                variant="outlined"
                fullWidth
                value={Kurzel}
                onChange={(e) => setKurzel(e.target.value)}
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
                label="Bezeichnung2"
                variant="outlined"
                fullWidth
                value={Bezeichnung2}
                onChange={(e) => setBezeichnung2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="Bezeichnung3"
                variant="outlined"
                fullWidth
                value={Bezeichnung3}
                onChange={(e) => setBezeichnung3(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={3} sm={6} md={12}>
              <TextField
                id="outlined-basic"
                label="Langtext"
                variant="outlined"
                multiline
                fullWidth
                value={BezeichnungT}
                rows={4}
                onChange={(e) => setBezeichnungT(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={3} sm={6} md={12}>
              <Accordion expanded={expanded == true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Merkmalsart Variabel</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item container spacing={2} direction={"row"}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="outlined-basic"
                        label="Maßeinheit"
                        variant="outlined"
                        fullWidth
                        value={Maßeinheit}
                        onChange={(e) => setMaßeinheit(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="outlined-basic"
                        label="Nennmaß"
                        variant="outlined"
                        fullWidth
                        value={Nennmaß}
                        onChange={(e) => setNennmaß(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {Maßeinheit}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="outlined-basic"
                        label="Oberetoleranz"
                        variant="outlined"
                        fullWidth
                        value={Oberetoleranz}
                        onChange={(e) => setOberetoleranz(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {Maßeinheit}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="outlined-basic"
                        label="Unteretoleranz"
                        variant="outlined"
                        fullWidth
                        value={Unteretoleranz}
                        onChange={(e) => setUnteretoleranz(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {Maßeinheit}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="Messmittel"
                variant="outlined"
                fullWidth
                value={Messmittel}
                onChange={(e) => SetMessmittel(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="DatumNeu"
                variant="outlined"
                fullWidth
                value={DatumNeu}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="DatumEdit"
                variant="outlined"
                fullWidth
                value={DatumEdit}
                onChange={(e) => setDatumEdit(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={2}>
                {!isPending && (
                  <Button variant="contained" onClick={handleSubmitPruefPos}>
                    Speichern
                  </Button>
                )}
                {isPending && (
                  <Button variant="contained">wird gespeichert....</Button>
                )}
                <Button onClick={OnClose} variant="contained">
                  Abbrechen
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  return (
    <Box marginTop={5} marginLeft={-1}>
      <Typography
        sx={{ fontSize: 30 }}
        color="text.secondary"
        gutterBottom
        align="left"
      >
        Neue Prüfplanposition
      </Typography>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Card variant="outlined">{CardPruefplanPos}</Card>
        </Grid>
      </Grid>
    </Box>
  );
}

//  <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 id="outlined-basic"
//                 label="Nennmaß"
//                 variant="outlined"
//                 fullWidth
//                 value={Nennmaß}
//                 onChange={(e) => setNennmaß(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 id="outlined-basic"
//                 label="Maßeinheit"
//                 variant="outlined"
//                 fullWidth
//                 value={Maßeinheit}
//                 onChange={(e) => setMaßeinheit(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 id="outlined-basic"
//                 label="Oberetoleranz"
//                 variant="outlined"
//                 fullWidth
//                 value={Oberetoleranz}
//                 onChange={(e) => setOberetoleranz(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 id="outlined-basic"
//                 label="Unteretoleranz"
//                 variant="outlined"
//                 fullWidth
//                 value={Unteretoleranz}
//                 onChange={(e) => setUnteretoleranz(e.target.value)}
//               />
//             </Grid>
