import { HelperText } from "@windmill/react-ui";

const ErrorSpan = ({ error }) => {
  return <>{error && <HelperText valid={false}>{error.message}</HelperText>}</>;
};
export default ErrorSpan;
