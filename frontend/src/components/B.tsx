import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function B() {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/")}>to A</Button>;
}
