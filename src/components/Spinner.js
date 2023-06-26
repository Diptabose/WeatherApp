import CircularProgress from "@mui/material/CircularProgress";
function Spinner(props) {
  const spinner = (
    <div
      className={`${
        props.center ? "absolute  left-1/2 top-1/2 -translate-x-1/2 " : ""
      }`}
    >
      {
        /* <div className={`h-10 w-10 rounded-full border border-gray-300 border-4 border-t-sky-700 border-t-4 animate-spin m-auto my-2`}>
  </div>*/ ""
      }
      <CircularProgress />
    </div>
  );

  return spinner;
}

export default Spinner;


