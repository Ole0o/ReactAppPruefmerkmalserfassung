import { useEffect, useState } from "react";
import { variables } from "../variables";
import PreufplanDetails from "./PruefplanDetails";
import NeuPruefplan from "./NeuPruefplan";
import "../styles.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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
import WEPruefung from "../components/WEPruefung";
import NeuWareneingang from "./NeuWareneingang";
import RightIcon from "@mui/icons-material/KeyboardArrowRight";
import Tooltip from "@mui/material/Tooltip";

export function WEBasisdaten(props) {
  const [welist, setWEList] = useState([]);
  const [selectedwelist, setSelectedWElist] = useState();
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    refreshList();
  }, []);
  function refreshList() {
    fetch(variables.API_URL + "wareneingang")
      .then((response) => response.json())
      .then((data) => {
        setWEList(data);
      });
  }

  if (selectedwelist) {
    return <WEPruefung selectedwelist={selectedwelist}></WEPruefung>;
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
        placeholder="Suche Wareneingangprüfung"
        inputProps={{ "aria-label": "suche wareneingang" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );

  const rowbackgroundcolors = {
    Ungeprüft: "#ef5350",
    Geprüft: "green",
  };
  const rows = welist;
  const we = (
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
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Pruefstatus</TableCell>
            <TableCell align="left">WE-Nummer</TableCell>
            <TableCell align="left">Liefermenge</TableCell>
            <TableCell align="left">Stichprobenmenge</TableCell>
            <TableCell align="left">Einheit</TableCell>
            <TableCell align="left">Artikelnummer</TableCell>
            <TableCell align="left">Artikelsuchbegriff</TableCell>
            <TableCell align="left">Lieferantennummer</TableCell>
            <TableCell align="left">Lieferantensuchbegriff</TableCell>
            <TableCell align="left">Prüfplatz</TableCell>
            <TableCell align="left">Prüfart</TableCell>
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
              key={xrow.IDWareneingang}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: rowbackgroundcolors[xrow.Pruefstatus] ?? "fff",
              }}
            >
              <TableCell component="th" scope="row">
                {xrow.IDWareneingang}
              </TableCell>
              <TableCell align="left">{xrow.Pruefstatus}</TableCell>
              <TableCell align="left">{xrow.WENummer}</TableCell>
              <TableCell align="left">{xrow.LiefermengeIst}</TableCell>
              <TableCell align="left">{xrow.AQLStichprobenmenge}</TableCell>
              <TableCell align="left">{xrow.ArtikelMengeneinheit}</TableCell>
              <TableCell align="left">{xrow.ArtikelNummer}</TableCell>
              <TableCell align="left">{xrow.ArtikelSuchbegriff}</TableCell>
              <TableCell align="left">
                {xrow.PruefplanLieferantenNummer}
              </TableCell>
              <TableCell align="left">
                {xrow.PruefplanLieferantenSuchbegriff}
              </TableCell>
              <TableCell align="left">{xrow.PruefplanPruefplatz}</TableCell>
              <TableCell align="left">{xrow.PruefplanPruefart}</TableCell>
              <TableCell align="left">
                <Tooltip title="Prüfung Erfassen">
                  <Fab
                    color="primary"
                    size="small"
                    style={{
                      zIndex: 2,
                    }}
                    aria-label="edit"
                    onClick={() => setSelectedWElist(xrow)}
                  >
                    <RightIcon />
                  </Fab>
                </Tooltip>
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
        Wareneingangprüfung
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
          <Card variant="outlined">{we}</Card>
        </Grid>
      </Grid>
      <NeuWareneingang
        open={isOpen}
        OnClose={() => setisOpen(false)}
      ></NeuWareneingang>
    </Box>
  );
}
export default WEBasisdaten;
