import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function A() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate("/b")}>to B</Button>;
}
