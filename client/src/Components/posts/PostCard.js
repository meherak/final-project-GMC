import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
// import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deletePost } from "../../JS/actions/post";
import houseImj from "../../assets/download.jpg";
import "./post-card.css";
import { useHistory } from "react-router";
import Button from '../button/Button';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));


const PostCard = ({ post }) => {
  // const [expanded, setExpanded] = React.useState(false);
  
  const history = useHistory();

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  // style={{maxWidth: '18rem'}}

  return (
    <div className="card">
      <img src={houseImj} className="card-img-top" alt={post.title} />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.description.length > 60 ? post.description.slice(0, 60) + '...' : post.description}</p>
      </div>
      <div className="links">
        <Link to={{ pathname: "editpost", state: { id: post._id } }}>
          <Button label="Edit" color="light" clickHandler={() => history.push('/posts')} />
        </Link>
        <Button label="Delete" color="light" clickHandler={handleDelete} />
        </div>
    </div>
  );
    // <Card>
    //   <CardHeader
    //     avatar={
    //       <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
    //         R
    //       </Avatar>
    //     }
    //     action={
    //       <IconButton aria-label="settings">
    //         <MoreVertIcon />
    //       </IconButton>
    //     }
    //     title={post.title}
    //     subheader={post.date}
    //   />
    //   <CardMedia
    //     component="img"
    //     height="194"
    //     image={houseImj}
    //     alt="Paella dish"
    //   />
    //   <CardContent>
    //     <Typography variant="body2" color="text.secondary">
    //       {post.description}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>
    //     <IconButton aria-label="add to favorites">
    //       <FavoriteIcon />
    //     </IconButton>
    //     <Link to={{ pathname: "editpost", state: { id: post._id } }}>
    //       <IconButton aria-label="edit">
    //         <EditIcon />
    //       </IconButton>
    //     </Link>
    //     <IconButton onClick={handleDelete}>
    //       <DeleteIcon />
    //     </IconButton>
    //     <ExpandMore
    //       expand={expanded}
    //       onClick={handleExpandClick}
    //       aria-expanded={expanded}
    //       aria-label="show more"
    //     >
    //       <ExpandMoreIcon />
    //     </ExpandMore>
    //   </CardActions>
    //   <Collapse in={expanded} timeout="auto" unmountOnExit>
    //     <CardContent>
    //       <Typography paragraph>Method:</Typography>
    //       <Typography paragraph>Heat</Typography>
    //       <Typography paragraph>Heat oil</Typography>
    //       <Typography paragraph>Add rice</Typography>
    //       <Typography>Set aside</Typography>
    //     </CardContent>
    //   </Collapse>
    // </Card>
};

export default PostCard;
