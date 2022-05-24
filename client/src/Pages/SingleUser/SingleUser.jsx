import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/get-one-user/${id}`);
        setUser(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Container>
          <Paper sx={{ marginTop: 3 }}>
            <img src={`/uploads/${user.image}`} alt="" style={{ width: 200 }} />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="subtitle1">{user.age}</Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Typography variant="body1">{user.description}</Typography>
          </Paper>
        </Container>
      )}
    </Container>
  );
};

export default SingleUser;
