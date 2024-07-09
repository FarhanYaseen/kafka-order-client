import React from "react";
import OrderForm from "./components/OrderForm";
import { CssBaseline, Container, Box } from "@mui/material";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <Box sx={{ mt: 4 }}>
          <OrderForm />
        </Box>
      </Container>
    </div>
  );
}

export default App;
