import { useOutletContext, useNavigate } from "react-router-dom";

export default function AboutPage() {

  const {user} = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        navigate('/signin');
      }
    };

    verifyUser();
  }, [user, navigate]); 

    return (
    <h2>This is where users can come and learn about the site</h2>
    );
  }