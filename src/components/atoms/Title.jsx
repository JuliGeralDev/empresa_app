import { Typography } from "@mui/material";

const Title = ({ text }) => {
  return (
    <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
      {text}
    </Typography>
  );
};

export default Title;