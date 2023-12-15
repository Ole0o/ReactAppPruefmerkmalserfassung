import React from "react";
import Box from "@mui/material/Box";
import { Autocomplete, Card, Grid, TextField } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { variables } from "../variables";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

function PruefplanSearch({ setSearchPruefplanItem }) {
  const [pruefplanlist, setPruefplanList] = useState([]);
  // SQL_GET Artikel
  const getPruefplanList = useCallback(() => {
    fetch(variables.API_URL + "pruefplan")
      .then((response) => response.json())
      .then((data) => {
        setPruefplanList(data);
      });
  });
  useEffect(() => {
    getPruefplanList();
  }, []);
  return (
    <Card>
      <Grid container spacing={2} direction="column" marginTop={0.5}>
        <Grid item xs={12} sm={6} md={3}>
          <Stack sx={{ width: 800 }} marginTop={1} marginLeft={2}>
            <Autocomplete
              id="ID"
              sx={{ width: 800 }}
              getOptionLabel={(pruefplanlist) => pruefplanlist.Nummer}
              options={pruefplanlist}
              isOptionEqualToValue={(option, value) =>
                option.Nummer === value.Nummer
              }
              noOptionsText={"keine Artikel vorhanden"}
              onChange={(event, value) => setSearchPruefplanItem(value)}
              renderOption={(props, pruefplanlist) => (
                <Box component={"li"} {...props} key={pruefplanlist.ID}>
                  {pruefplanlist.Nummer}
                  {pruefplanlist.Suchbegriff}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label={"Prüfplansuche"} />
              )}
            ></Autocomplete>
          </Stack>
        </Grid>
        <CardActions>
          <Stack
            spacing={2}
            direction={"row"}
            marginLeft={3}
            marginTop={0.5}
            marginBottom={1}
          >
            <Button
              //   onClick={() => handleArtikelPruefplan(artikelList)}
              variant="contained"
              size="small"
            >
              Auswählen
            </Button>
          </Stack>
        </CardActions>
      </Grid>
    </Card>
  );
}
export default PruefplanSearch;
