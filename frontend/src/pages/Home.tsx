import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: "600px",
          textAlign: "center",
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom color={"#393939"}>
          Welcome to <br></br>
          <b>ECHOCHAT</b> !
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          ECHOCHAT is your personal assistant ready to help with a variety of
          tasks. Ask questions, get information, or just have a chat.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Here’s what I can do:
          <ul style={{ textAlign: "left" }}>
            <li>Answer general questions.</li>
            <li>Assist with learning and study topics.</li>
            <li>Provide business insights and advice.</li>
            <li>Help with daily tasks and reminders.</li>
            <li>Suggest entertainment options.</li>
          </ul>
        </Typography>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            backgroundColor: "#393939",
            color: "white",
            borderRadius: "5px",
            padding: "15px 50px",
            fontWeight: "700",
            fontSize: "15px",
            display: "inline-block",
            textAlign: "center",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#272727")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#393939")
          }
        >
          Start Chatting
        </Link>
      </Paper>
    </Container>
  );
};

export default Home;
