import CircularProgress from "@mui/material/CircularProgress";
function Spinner(props) {
  const spinner = (
    <div
      className={`${
        props.center ? "absolute  left-1/2 top-1/2 -translate-x-1/2 " : ""
      }`}
    >
      <CircularProgress />
    </div>
  );

  return spinner;
}

export default Spinner;
