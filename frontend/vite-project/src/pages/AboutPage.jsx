import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AboutPage() {

  const {user} = useOutletContext();
  const navigate = useNavigate();

    return (
    <h2>This is where users can come and learn about the site</h2>
    );
  }