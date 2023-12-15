import React from "react";
import Box from "@mui/material/Box";
import { Autocomplete, Card, Grid, TextField } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { variables } from "../variables";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
function ArtikelSearch({ handleArtikel, setSearchItem }) {
  const [artikelList, setArtikelList] = useState([]);
  // SQL_GET Artikel
  const getArtikelList = useCallback(() => {
    fetch(variables.API_URL + "artikel")
      .then((response) => response.json())
      .then((data) => {
        setArtikelList(data);
      });
  });
  useEffect(() => {
    getArtikelList();
  }, []);
  return (
    <Card>
      <Grid container spacing={2} direction="column" marginTop={0.5}>
        <Grid item xs={12} sm={6} md={3}>
          <Stack sx={{ width: 800 }} marginTop={1} marginLeft={2}>
            <Autocomplete
              id="ID"
              sx={{ width: 800 }}
              getOptionLabel={(artikelList) => artikelList.Nummer}
              options={artikelList}
              isOptionEqualToValue={(option, value) =>
                option.Nummer === value.Nummer
              }
              noOptionsText={"keine Artikel vorhanden"}
              onChange={(event, value) => setSearchItem(value)}
              renderOption={(props, artikelList) => (
                <Box component={"li"} {...props} key={artikelList.ID}>
                  {artikelList.Nummer}
                  {artikelList.Suchbegriff}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label={"Artikelsuche"} />
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
              onClick={() => handleArtikel(artikelList)}
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
export default ArtikelSearch;
