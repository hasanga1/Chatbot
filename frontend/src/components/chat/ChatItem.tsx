import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#fff",
        my: 1,
        gap: 2,
        borderBottomRightRadius: "10px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "#282828" }}>
        <img src="assistant.png" alt="" width={"30px"} />
      </Avatar>
      <Box color={"#393939"}>
        {!messageBlocks && (
          <Typography fontSize={"17px"} color={"#393939"}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography fontSize={"17px"} color={"#393939"}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#f7f7f7",
        gap: 2,
        borderBottomLeftRadius: "10px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "#393939", color: "white" }}>
        {auth?.user?.name[0]}
      </Avatar>
      <Box color={"#393939"}>
        {!messageBlocks && (
          <Typography fontSize={"17px"} color={"#393939"}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography fontSize={"17px"} color={"#393939"}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
