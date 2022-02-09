import React, {useState} from 'react';
import {FaPencilAlt} from "react-icons/fa";
import logo from "../../Assests/sample_logo.jpg";
import "./Logo.css"

export const Logo = () => {

    const [file, setFile] = useState(logo)

    const UpdateLogo = (e) => {
        if(e.target.files[0].type.includes('image')){
            setFile(URL.createObjectURL(e.target.files[0]))
        }
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
                    style={{display:'none'}}
                    onChange={  event => {
                        UpdateLogo(event)
                    }}
                />
                <img
                    id="logo"
                    src={file}
                    alt="LOGO"
                />
            </div>
    )
}
