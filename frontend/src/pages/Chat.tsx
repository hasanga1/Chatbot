import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(content);

      if (Array.isArray(chatData.chats)) {
        setChatMessages(chatData.chats);
      } else {
        console.error("Invalid chat data structure:", chatData);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats Failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100vh",
        gap: 3,
        background: "#e9e9e9",
      }}
    >
      <Box
        sx={{
          display: { md: "flex", height: "100vh" },
          flex: 0.2,
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            bgcolor: "#fff",
            flexDirection: "column",
            pt: "100px",
            overflowY: "auto",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "#393939",
              color: "white",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto" }} color={"#2a2a2a"} fontWeight={600}>
            {auth?.user?.name}
          </Typography>

          <Typography
            sx={{ mx: "auto", pt: "50px" }}
            color={"#2a2a2a"}
            fontWeight={600}
            fontSize={"20px"}
          >
            Welcome to{" "}
            <b style={{ fontWeight: "800px", color: "black" }}>ECHOCHAT</b> !
          </Typography>

          <Typography sx={{ mx: "auto", p: 3 }} color={"#2a2a2a"}>
            You can ask me anything! Here’s what I can do:
            <br />
            <br />
            <strong>General Info:</strong> Get answers to common questions.
            <br />
            <em>Example:</em> What's the capital of France?
            <br />
            <br />
            <strong>Study Help:</strong> I can explain topics or solve problems.
            <br />
            <em>Example:</em> Explain photosynthesis.
            <br />
            <br />
            <strong>Business Tips:</strong> Get insights and advice.
            <br />
            {/* <em>Example:</em> Current trends in e-commerce?
            <br />
            <br /> */}
            {/* <strong>Daily Tasks:</strong> Set reminders or find recipes.
            <br />
            <em>Example:</em> Remind me to submit my report tomorrow.
            <br />
            <br />
            <strong>Pro Tip:</strong> I can summarize, translate, or generate
            ideas! */}
          </Typography>

          <Button
            onClick={handleDeleteChats}
            sx={{
              px: '50px',
              py: '15px',
              my: "auto",
              mb: '50px',
              color: "white",
              fontWeight: "700",
              borderRadius: 50,
              mx: "auto",
              bgcolor: '#393939',
              ":hover": { bgcolor: '#272727' },
              textTransform: "none",
              fontSize: '15px'
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
          mt: "100px",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#393939",
            mb: 2,
            fontWeight: 600,
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            // height: "vh",
            mb: "30px",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            overflowY: "auto",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 8,
            backgroundColor: "rgb(255, 255, 255)",
            display: "flex",
            margin: "auto",
            marginBottom: "50px"
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask something here..."
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "#393939",
              fontSize: "17px",
            }}
          />
          <IconButton
            sx={{ ml: "auto", color: "#393939" }}
            onClick={handleSubmit}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
