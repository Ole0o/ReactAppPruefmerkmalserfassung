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
import { CardContent, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArtikelSearch from "../components/ArtikelSearch";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import PruefplanArtikelList from "../components/PruefplanplanArtikelList";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

export default function PruefplanArtikelMap({
  open,
  OnClosePMA,
  xIDPruefplan,
  XPruefplannummerNummer,
}) {
  const [searchItem, setSearchItem] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [responseData, setResponseData] = React.useState([]);
  const CONTAINERLAYER = {
    position: "fixed",
    top: "6%",
    left: "50%",
    right: "0%",
    bottom: "0%",
    transform: "translate(-0%, -0%)",
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
  const navigate = useNavigate();
  if (!open) return null;
  const handleArtikel = (artikelList) => {
    artikelList.forEach((xListItem) => {
      if (xListItem.ID == searchItem.ID) {
        setSelectedItem(xListItem);
        console.log(xListItem);
      }
    });
    const IDArtikel = searchItem.ID;
    const IDPruefplan = xIDPruefplan;
    const requeststore = {
      IDPruefplan,
      IDArtikel,
    };
    console.log(requeststore);
    fetch(variables.API_URL + "artikelpruefplan", {
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
      alert(`You have updated succesfull!`);
    });
  };

  const CardPruefplanData = (
    <Card>
      <Grid
        container
        spacing={2}
        direction="row"
        marginTop={0.5}
        marginLeft={0.5}
      >
        <Grid item marginTop={1}>
          <Button onClick={OnClosePMA} variant="contained" size="small">
            <KeyboardArrowLeft />
            Zurück
          </Button>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            Prüfplanung-Artikelzuordnung
          </Typography>
        </Grid>
      </Grid>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="Prüfplannummer"
                variant="outlined"
                fullWidth
                value={xIDPruefplan}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="outlined-basic"
                label="Suchbegriff"
                variant="outlined"
                fullWidth
                value={XPruefplannummerNummer}
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
  const CardArtikelSearch = (
    <ArtikelSearch
      handleArtikel={handleArtikel}
      setSearchItem={setSearchItem}
    ></ArtikelSearch>
  );
  // const CardZuordnung = (
  //   <Card>
  //     <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
  //       Prüfplanung Artikelliste
  //     </Typography>
  //     <CardContent>
  //       <Grid container spacing={2}>
  //         <Grid item container spacing={2}></Grid>
  //         <Grid item xs={4} sm={8} md={12}>
  //           <DataGrid
  //             getRowId={(row) => row.IDArtikel}
  //             rows={rows}
  //             columns={columns}
  //             initialState={{
  //               pagination: {
  //                 paginationModel: { page: 0, pageSize: 5 },
  //               },
  //             }}
  //             pageSizeOptions={[5, 10]}
  //             checkboxSelection
  //           />
  //         </Grid>
  //       </Grid>
  //     </CardContent>
  //   </Card>
  // );
  return (
    <>
      <div style={OYERLAYERSTYLES}></div>
      <div style={CONTAINERLAYER}>
        <Container>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Card variant="outlined">{CardPruefplanData}</Card>
            </Grid>
            <Grid item>
              <Card variant="outlined">{CardArtikelSearch}</Card>
            </Grid>
            <Grid item>
              <PruefplanArtikelList
                selectedIDPruefplan={xIDPruefplan}
              ></PruefplanArtikelList>
              {/* <Card variant="outlined">{CardZuordnung}</Card> */}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
