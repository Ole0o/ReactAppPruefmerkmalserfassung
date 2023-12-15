import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, Container } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { variables } from "../variables";
import Typography from "@mui/material/Typography";

const PreufplanPosList = ({ props, xIDPruefplan }) => {
  const [preufplanposList, setPreufplanposList] = useState([]);
  // SQL_GET Prüfplanpositionen Prüfplan mit Filter auf den selektierten Prüfplan
  const getPruefplanPosList = useCallback(() => {
    fetch(variables.API_URL + "pruefplanpos")
      .then((response) => response.json())
      .then((data) => {
        var pruefplanListe = [];
        data.forEach((xPruefplaposItem) => {
          if (xPruefplaposItem.IDPruefplan == xIDPruefplan) {
            pruefplanListe.push(xPruefplaposItem);
          }
          setPreufplanposList(pruefplanListe);
        });
      });
  }, []);
  useEffect(() => {
    getPruefplanPosList();
  }, [getPruefplanPosList]);
  const columns = [
    { field: "Positionsnummer", headerName: "Positionsnummer", width: 130 },
    { field: "ID", headerName: "ID", width: 130 },
    { field: "IDPruefplan", headerName: "IDPruefplan", width: 130 },
    { field: "Pruefmerkal", headerName: "Prüfmerkmal", width: 130 },
    { field: "Merkmalsart", headerName: "Merkmalsart", width: 130 },
    { field: "Kurzel", headerName: "Kurzel", width: 130 },
    { field: "Bezeichnung1", headerName: "Bezeichnung1", width: 130 },
    { field: "Bezeichnung2", headerName: "Bezeichnung2", width: 130 },
    { field: "Bezeichnung3", headerName: "Bezeichnung3", width: 130 },
    { field: "BezeichnungT", headerName: "BezeichnungT", width: 130 },
  ];
  const rows = preufplanposList;
  return (
    <Box marginTop={5} marginLeft={-1}>
      <Card>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          align="left"
          marginTop={1}
          marginLeft={1}
        >
          Tabelle Prüfplanpositionen
        </Typography>
        <DataGrid
          marginLeft={1}
          marginTop={1}
          getRowId={(row) => row.ID}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Card>
    </Box>
  );
};
export default PreufplanPosList;
