import { useContext } from "react"
import { AuthContext } from "../helpers/AuthContext"

function Profile(){
    const {authState} = useContext(AuthContext);

    return(
        <div className="w-100 h-100 d-flex justify-content-center">
            <div className="card" style={{width: '18rem'}}>
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{authState.username}</h5>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

export default Profile