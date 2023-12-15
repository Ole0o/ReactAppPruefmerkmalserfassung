import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../variables";
import "../styles.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArtikelSearch from "../components/ArtikelSearch";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";

const CONTAINERLAYER = {
  position: "fixed",
  top: "6%",
  left: "50%",
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

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}.${
  currentDate.getMonth() + 1
}.${currentDate.getFullYear()}`;

const rowbackgroundcolors = {
  true: "red",
  false: "lightgreen",
};

export default function NeuWareneingang({ open, OnClose }) {
  const [searchItem, setSearchItem] = useState([]);
  const [wenummer, setWENummer] = useState("");
  const [liefermengesoll, setLiefermengesoll] = useState("");
  const [liefermengeist, setLiefermengeist] = useState("");
  const [bestellnummer, setBestellnummer] = useState("");
  const [bestelldatum, setBestelldatum] = useState(formattedDate);
  const [lieferscheinnummer, setLieferscheinnummer] = useState("");
  const [lieferscheindatum, setLieferscheindatum] = useState(formattedDate);
  const [wareneingangsdatum, setWareneingangsdatum] = useState(formattedDate);
  const [pruefstatus, setPreufstatus] = useState("Ungeprüft");

  const navigate = useNavigate();
  if (!open) return null;
  const handleThrow = (e) => {
    setWENummer("");
    setLiefermengesoll("");
    setLiefermengeist("");
    setBestellnummer("");
    setBestelldatum("");
    setLieferscheinnummer("");
    setLieferscheindatum("");
  };

  const handleArtikel = (artikelList) => {
    //    artikelList.forEach((xListItem) => {
    //      if (xListItem.ID == searchItem.ID) {
    //        setSelectedItem(xListItem);
    //        console.log(xListItem);
    //      }
    //    });
    debugger;
    const IDArtikel = searchItem.ID;
    const requeststore = {
      IDArtikel,
      wenummer,
      liefermengesoll,
      liefermengeist,
      bestellnummer,
      bestelldatum,
      lieferscheinnummer,
      lieferscheindatum,
      wareneingangsdatum,
      pruefstatus,
    };
    debugger;
    console.log(requeststore);
    fetch(variables.API_URL + "wareneingang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "/",
      },
      body: JSON.stringify(requeststore),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong by updating Data...");
      }
      alert(`You have insert succesfull!`);
      navigate(0);
    });
  };

  return (
    <>
      <div style={OYERLAYERSTYLES}></div>
      <div style={CONTAINERLAYER}>
        <Grid container spacing={2} direction="row" marginTop={2}>
          <Grid item xs={12} sm={6} md={3} marginTop={1} marginLeft={-6.5}>
            <Button onClick={OnClose} variant="contained" size="small">
              <KeyboardArrowLeft />
              Zurück
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{ fontSize: 30 }}
              color="text.secondary"
              gutterBottom
            >
              Neuanlage WE
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="WE-Datum"
              variant="outlined"
              fullWidth
              value={wareneingangsdatum}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Prüfstatus"
              variant="outlined"
              fullWidth
              value={pruefstatus}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} marginTop={2} marginLeft={-12}>
            <Tooltip title="Eingabe verwerfen">
              <ClearIcon onClick={handleThrow} />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="column" marginTop={0.25}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Wareneingangsnummer"
              variant="outlined"
              fullWidth
              value={wenummer}
              onChange={(e) => setWENummer(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Liefermenge Soll"
              variant="outlined"
              fullWidth
              value={liefermengesoll}
              onChange={(e) => setLiefermengesoll(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ST</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Liefermenge Ist"
              variant="outlined"
              fullWidth
              value={liefermengeist}
              onChange={(e) => setLiefermengeist(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ST</InputAdornment>
                ),
              }}
              sx={{
                backgroundColor:
                  rowbackgroundcolors[liefermengeist < liefermengesoll] ??
                  "fff",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Bestellnummer"
              variant="outlined"
              fullWidth
              value={bestellnummer}
              onChange={(e) => setBestellnummer(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Bestelldatum"
              variant="outlined"
              fullWidth
              value={bestelldatum}
              onChange={(e) => setBestelldatum(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Lieferscheinnummer"
              variant="outlined"
              fullWidth
              value={lieferscheinnummer}
              onChange={(e) => setLieferscheinnummer(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="outlined-basic"
              label="Lieferscheindatum"
              variant="outlined"
              fullWidth
              value={lieferscheindatum}
              onChange={(e) => setLieferscheindatum(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ArtikelSearch
              setSearchItem={setSearchItem}
              handleArtikel={handleArtikel}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <PruefplanSearch setSearchPruefplanItem={setSearchPruefplanItem} />
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2} direction={"row"}>
              {/* {!isPending && (
                <Button variant="contained" onClick={handleSubmit}>
                  Anlegen
                </Button>
              )} */}
              {/* {isPending && (
                <Button variant="contained">wird angelegt....</Button>
              )} */}
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
