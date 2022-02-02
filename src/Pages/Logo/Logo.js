import React from 'react';
import {FaPencilAlt} from "react-icons/fa";
import logo from "../../Assests/sample_logo.jpg";
import "./Logo.css"

export const Logo = () => {

    const UpdateLogo = (file) => {
        console.log("file uploaded: ", file)
    }

    return(
            <div className="image">
                <label htmlFor="image" className="editImage">
                    <FaPencilAlt style={{
                        color: '#fff',
                        display: 'block',
                        fontSize: '1.25rem'
                    }} />
                </label>
                <input
                    id="image"
                    type="file"
                    placeholder="add your logo"
                    style={{display:'none'}}
                    onChange={  event => {
                        UpdateLogo(event.target.files[0])
                    }}
                />
                <img
                    src={logo}
                    alt="LOGO"
                />
            </div>
    )
}
