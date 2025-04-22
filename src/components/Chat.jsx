import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import NoProfile from '../assets/img/no-profile.png';
import aiimg from '../assets/img/aiimg.png';


const Chat = (props) => {
    const isAI = (props.type === 'AI');
    const classes = isAI ? 'p-chat__row' : 'p-chat__reverse';
  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isAI ? (
                  <Avatar alt="icon" src={aiimg} />
        ) : (
          <Avatar alt="icon" src={NoProfile} />
        )}
      </ListItemAvatar>
      <div className="p-chat__bubble">{props.text}</div>
    </ListItem>
  );
};

export default Chat;