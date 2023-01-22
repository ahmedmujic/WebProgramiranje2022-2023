import { useContext, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const {authState} = useContext(AuthContext);

  useEffect(()=> {
    console.log(authState)
  })

    return (
      <div >
        test
      </div>
    );
  }

  export default Home;
