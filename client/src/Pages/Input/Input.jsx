import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { useDropzone } from "react-dropzone";
import { Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Input = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      files.length === 0 &&
      input.name === "" &&
      input.email === "" &&
      input.age === "" &&
      input.description === ""
    ) {
      setError("Please Provide all the necessary information");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", files[0]);
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("age", input.age);
      formData.append("description", input.description);
      axios
        .post("/api/post-user", formData)
        .then((res) => {
          setLoading(false);
          setSuccess(true);
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }
  };
  return (
    <Container
      sx={{ justifyContent: "center", alignItems: "center", marginTop: 3 }}
      maxwidth="sm"
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 3,
          flexDirection: "column",
        }}
      >
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "40%",
            flexDirection: "column",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 4 }}
            name="name"
            onChange={handleChange}
            value={input.name}
          />
          <TextField
            id="outlined-basic"
            label="Age"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 4 }}
            name="age"
            onChange={handleChange}
            type="number"
            value={input.age}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            sx={{ marginTop: 4 }}
            name="email"
            onChange={handleChange}
            value={input.email}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 4 }}
            name="description"
            onChange={handleChange}
            value={input.description}
          />
          <Box sx={{ marginTop: 2 }}></Box>
        </Box>
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{ border: "2px" }}
        >
          <input {...getInputProps()} />
          <p>Drag And Drop Your Image here</p>
        </div>
        {files &&
          files.map((file, i) => (
            <Container
              key={i}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={file.preview}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                alt="preview"
                style={{ width: "300px" }}
              />
            </Container>
          ))}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            sx={{ marginTop: 3 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default Input;
