import { Container } from "@mui/system";
import React, { useEffect } from "react";
import CardComponent from "../../Components/Card/CardComponent";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    axios
      .get("/api/get-all-users")
      .then((response) => {
        setData(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        marginTop: 4,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <img src="" alt="" />
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {data && data.map((user, i) => <CardComponent key={i} user={user} />)}
    </Container>
  );
};

export default Home;
