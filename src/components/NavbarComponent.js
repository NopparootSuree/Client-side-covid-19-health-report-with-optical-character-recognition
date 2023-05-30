import './NavbarComponent.css'

const NavbarComponent = (props) => {
    return(
        <div>
            <ul>
                <li><img src={props.image} alt="" id="pictureUrl" className="divImg"/></li>
                <li><p id="displayName" className="pName" >{props.displayName}</p></li>
            </ul>
        </div>
        
    )
}

export default NavbarComponent;