import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomizedInput from "../components/shared/CustomizedInput";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signined In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box
      display={"flex"}
      height={"100vh"}
      flex={{ xs: 1, md: 0.5 }}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}
      ml={"auto"}
      sx={{
        background: "#e9e9e9",
        display: "flex",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "30px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "10px",
          border: "none",
          background: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            padding={2}
            fontWeight={600}
            color={"#393939"}
          >
            Sign In
          </Typography>
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 2,
              mt: 2,
              width: "400px",
              borderRadius: 2,
              color: "#fff",
              bgcolor: "#393939",
              textTransform: "none",
              fontSize: "15px",
              ":hover": { bgcolor: "#272727" },
            }}
          >
            Sign In
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
