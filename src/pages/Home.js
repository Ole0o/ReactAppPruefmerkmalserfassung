import { useReducer } from "react";
import Sidenav from "../Sidenav";
import Box from "@mui/material/Box";

function createInitialState(username) {
  debugger;
  const initialTodos = [];
  return {
    messwert: "",
    messwertlist: initialTodos,
  };
}
function reducer(state, action) {
  debugger;
  switch (action.type) {
    case "changed_messwert": {
      return {
        messwert: action.nextMesswert,
        messwertlist: state.messwertlist,
      };
    }
    case "added_messwert": {
      return {
        messwert: "",
        messwertlist: [
          {
            id: state.messwertlist.length,
            text: state.messwert,
          },
          ...state.messwertlist,
        ],
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}
export default function Home({ username }) {
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
  return (
    <>
      <Box marginTop={-8}>
        <input
          value={state.messwert}
          onChange={(e) => {
            dispatch({
              type: "changed_messwert",
              nextMesswert: e.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: "added_messwert" });
          }}
        >
          Add
        </button>
        <ul>
          {state.messwertlist.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </Box>
    </>
  );
}
