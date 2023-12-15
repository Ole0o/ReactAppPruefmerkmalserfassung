import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { variables } from "../variables";
import Paper from "@mui/material/Paper";
import PruefplanArtikelMap from "../pages/PruefplanArtikelMap";
import { render } from "@testing-library/react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Sidenav from "../Sidenav";

function ArtikelList() {
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
  const columns = [
    { field: "ID", headerName: "ID", width: 130 },
    { field: "Nummer", headerName: "Nummer", width: 130 },
    { field: "Suchbegriff", headerName: "Suchbegriff", width: 130 },
    {
      field: "Bezeichnung1",
      headerName: "Bezeichnung1",
      width: 130,
    },
    { field: "Bezeichnung2", headerName: "Bezeichnung2", width: 130 },
    { field: "Bezeichnung3", headerName: "Bezeichnung3", width: 130 },
    { field: "BezeichnungT", headerName: "BezeichnungT", width: 130 },
    { field: "Lagerplatz", headerName: "Lagerplatz", width: 130 },
    { field: "Mengeneinheit", headerName: "Mengeneinheit", width: 130 },
    { field: "Revisionsstand", headerName: "Revisionsstand", width: 130 },
  ];
  const rows = artikelList;
  // debugger;
  // if (artikelList && artikelList.length > 0) {
  //   <PruefplanArtikelMap xartikelList={artikelList} />;
  // }
  return (
    <Box marginTop={-7} marginLeft={32}>
      <Grid
        container
        spacing={2}
        direction="column"
        sx={{ flexGrow: 1, p: 0, width: "100%" }}
      >
        <Grid item>
          <Typography
            sx={{ fontSize: 30 }}
            color="text.secondary"
            gutterBottom
            align="left"
          >
            Artikelstamm
          </Typography>
        </Grid>
        <Grid item>
          <DataGrid
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
        </Grid>
      </Grid>
    </Box>
  );
}
export default ArtikelList;

//       <Typography
//         sx={{ fontSize: 30 }}
//         color="text.secondary"
//         gutterBottom
//         align="left"
//       >
//         Prüfplanung
//       </Typography>
//       <Grid
//         container
//         spacing={2}
//         direction="column"
//         // sx={{ flexGrow: 1, p: 0, width: "500px" }}
//       >
//         <Grid item>
//           <Card variant="outlined">{SearchField}</Card>
//         </Grid>
//         <Grid item>
//           <Card variant="outlined">{Pruefplan}</Card>
//         </Grid>
//       </Grid>
//       <NeuPruefplan
//         open={isOpen}
//         OnClose={() => setisOpen(false)}
//       ></NeuPruefplan>
//     </Box>
//   </div>
// );
