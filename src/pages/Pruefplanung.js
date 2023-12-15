import React, { useEffect, useState } from "react";
import { variables } from "../variables";
import PreufplanDetails from "./PruefplanDetails";
import NeuPruefplan from "./NeuPruefplan";
import "../styles.css";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export function Pruefplanung(props) {
  const [preufplan, setPruefplan] = React.useState([]);
  // const [filterespreufplan, setFilterespreufplan] = React.useState([]);
  const [selectedPreufplan, setSelectedPreufplan] = React.useState();
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    fetch(variables.API_URL + "pruefplan")
      .then((response) => response.json())
      .then((data) => {
        setPruefplan(data);
      });
  }, []);

  if (selectedPreufplan) {
    return (
      <PreufplanDetails
        selectedPreufplan={selectedPreufplan}
      ></PreufplanDetails>
    );
  }

  const SearchField = (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        bgcolor: "#fff",
        color: "kkk",
        border: "2px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Suche Prüfplan"
        inputProps={{ "aria-label": "suche pruefplan" }}
        // value={query}
        // onChange={(e) => setQuery(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );

  const rowbackgroundcolors = {
    Gesperrt: "#ef5350",
    // Erstellen: "orange",
    // Bearbeiten: "orange",
    // Prüfen: "orange",
    Freigabe: "lightgreen",
  };
  const rows = preufplan;
  const Pruefplan = (
    <TableContainer>
      <Table
        aria-label="simple table"
        sx={{
          bgcolor: "#fff",
          border: "2px solid",
          borderColor: "grey.300",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left" sortable="true">
              Nummer
            </TableCell>
            <TableCell align="left">Bezeichnung1</TableCell>
            <TableCell align="left">Version</TableCell>
            <TableCell align="left">Prüfbereich</TableCell>
            <TableCell align="left">Prüfart</TableCell>
            <TableCell align="left">Prüfplatz</TableCell>
            <TableCell align="left">
              {" "}
              <Fab
                color="primary"
                aria-label="add"
                size="small"
                onClick={() => setisOpen(true)}
                style={{
                  zIndex: 2,
                }}
              >
                <AddIcon />
              </Fab>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((xrow) => (
            <TableRow
              key={xrow.ID}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor:
                  rowbackgroundcolors[xrow.Statuspruefplan] ?? "fff",
              }}
            >
              <TableCell component="th" scope="row">
                {xrow.ID}
              </TableCell>
              <TableCell align="left">{xrow.Statuspruefplan}</TableCell>
              <TableCell align="left">{xrow.Nummer}</TableCell>
              <TableCell align="left">{xrow.Bezeichnung1}</TableCell>
              <TableCell align="left">{xrow.Version}</TableCell>
              <TableCell align="left">{xrow.PruefBereich}</TableCell>
              <TableCell align="left">{xrow.Pruefart}</TableCell>
              <TableCell align="left">{xrow.Pruefplatz}</TableCell>
              <TableCell align="left">
                <Fab
                  color="primary"
                  size="small"
                  style={{
                    zIndex: 2,
                  }}
                  aria-label="edit"
                  onClick={() => setSelectedPreufplan(xrow)}
                >
                  <EditIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return (
    <Box marginTop={-5} marginLeft={32}>
      <Typography
        sx={{ fontSize: 30 }}
        color="text.secondary"
        gutterBottom
        align="left"
      >
        Prüfplanung
      </Typography>
      <Grid
        container
        spacing={2}
        direction="column"
        // sx={{ flexGrow: 1, p: 0, width: "500px" }}
      >
        <Grid item>
          <Card variant="outlined">{SearchField}</Card>
        </Grid>
        <Grid item>
          <Card variant="outlined">{Pruefplan}</Card>
        </Grid>
      </Grid>
      <NeuPruefplan
        open={isOpen}
        OnClose={() => setisOpen(false)}
      ></NeuPruefplan>
    </Box>
  );
}
export default Pruefplanung;
