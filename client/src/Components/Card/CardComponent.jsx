import { ButtonBase } from "@mui/material";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const CardComponent = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/user/${props.user._id}`);
  };
  return (
    <ButtonBase onClick={onClick}>
      <Card
        elevation={2}
        sx={{ width: 345, marginX: 2, marginY: 2, height: 350 }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`/uploads/${props.user.image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.user.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {props.user.age} {props.user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.user.description}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default CardComponent;
