import React, { Component } from "react";
import { useState, useEffect } from "react";
import { variables } from "../variables";
import "../styles.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardContent, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";

const PruefplanArtikelList = (props) => {
  const [pruefplanartikellist, setPruefplanArtikelList] = useState([]);
  const [pruefposList, setPruefposList] = useState([]);
  const [clickedRow, setClickedRow] = React.useState();
  // SQL_GET Artikel
  const getArtikelList = () => {
    fetch(variables.API_URL + "artikelpruefplan")
      .then((response) => response.json())
      .then((data) => {
        const items = pruefposList.slice();
        data.forEach((xPruefplanArtikelItem) => {
          if (xPruefplanArtikelItem.IDPruefplan == props.selectedIDPruefplan) {
            items.push(xPruefplanArtikelItem);
          }
          setPruefplanArtikelList(items);
        });
      });
  };
  //  .then((data) => {
  //     debugger;
  //     data.forEach((xPruefplanArtikelItem) => {
  //       debugger;
  //         // var pruefposList = [];
  //     //   console.log(pruefposList);
  //       debugger;
  //       if (xPruefplanArtikelItem.IDPruefplan == props.selectedIDPruefplan) {
  //         debugger;
  //         pruefposList.push(xPruefplanArtikelItem);
  //       }
  //       setPruefplanArtikelList(pruefposList);
  //     });
  //   });
  debugger;
  useEffect(() => {
    getArtikelList();
  }, []);
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
    console.log(row);
  };
  const columns = [
    // { field: "IDArtikel", headerName: "IDArtikel", width: 75 },
    { field: "ArtikelNummer", headerName: "ArtikelNummer", width: 130 },
    {
      field: "ArtikelSuchbegriff",
      headerName: "ArtikelSuchbegriff",
      width: 130,
    },
    // { field: "IDPruefplan", headerName: "IDPruefplan", width: 75 },
    { field: "PruefplanNummer", headerName: "Prüfplannummer", width: 180 },
    {
      field: "PruefplanSuchbegriff",
      headerName: "PrüfplanSuchbegriff",
      width: 180,
    },
    {
      field: "delete",
      headerName: "Optionen",
      description: "option column.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Tooltip title="Verknüpfung löschen">
            <Button
              size="small"
              onClick={(e) => onButtonClick(e, params.row)}
              variant="contained"
            >
              Delete
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  const rows = pruefplanartikellist;

  const CardZuordnung = (
    <Card>
      <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
        Prüfplanung Artikelliste
      </Typography>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item container spacing={2}></Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                getRowId={(row) => row.IDArtikel}
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                //   checkboxSelection
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  return (
    <Grid item>
      <Card variant="outlined">{CardZuordnung}</Card>
    </Grid>
  );
};
export default PruefplanArtikelList;
