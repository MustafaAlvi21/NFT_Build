import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const GeneralForm = () => {
    const [links, setLinks] = useState({
        instagram: '',
        twitter: '',
        tiktok: '',
        youtube: '',
        facebook: '',
    });

    const [logos, setLogos] = useState({
        instagramLogo: null,
        twitterLogo: null,
        tiktokLogo: null,
        youtubeLogo: null,
        facebookLogo: null,
    });

    const handleLinkChange = (e) => {
        const { name, value } = e.target;
        setLinks((prevLinks) => ({
            ...prevLinks,
            [name]: value,
        }));
    };

    const handleLogoChange = (e) => {
        const { name, files } = e.target;
        setLogos((prevLogos) => ({
            ...prevLogos,
            [name]: files[0], // Assuming single file upload
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object
        const formData = new FormData();
        Object.entries(links).forEach(([key, value]) => {
            formData.append(key, value);
        });
        Object.entries(logos).forEach(([key, file]) => {
            if (file) {
                formData.append(key, file);
            }
        });

        try {
            const response = await axios.post(`${API_URL}/general/update-social-links`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(res => {
                    console.log(res);
                    if (typeof res.data != "undefined") return (res.data);

                })

            console.log("data", data);
        
            alert()
            alert()
            alert()
            window.location.reload();

        } catch (error) {
            console.log(error);

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with an error:', error.response.status);
                console.error('Error message:', error.response.data.message);
                if (typeof error.response.data != "undefined") return error.response.data
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from server');
                return { success: false }
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error during request setup:', error.message);
                return { success: false }
            }
        }

    };

    return (
        <div className="form-container-general">
            <h2>Social Links and Logo Upload</h2>
            <form onSubmit={handleSubmit} className="social-links-form">
                {Object.keys(links).map((key) => (
                    <div key={key} className="form-group">
                        <label>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                            <input
                                type="url"
                                name={key}
                                value={links[key]}
                                onChange={handleLinkChange}
                                required
                            />
                        </label>
                        <label>
                            Upload {key.charAt(0).toUpperCase() + key.slice(1)} Logo:
                            <input
                                type="file"
                                name={`${key}Logo`}
                                accept="image/*"
                                onChange={handleLogoChange}
                            />
                        </label>
                    </div>
                ))}
                <button type="submit" className="submit-button">Submit</button>
            </form>

            <style jsx>{`
                .form-container-general {
                    max-width: 600px;
                    margin: auto;
                    margin-top: 150px;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                h2 {
                    font-size: 30px;
                    color: yellow;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .social-links-form {
                    display: flex;
                    flex-direction: column;
                }

                .form-group {
                    margin-bottom: 15px;
                }

                label {
                    color: white;
                    display: block;
                    margin-bottom: 5px;
                }

                input[type="url"],
                input[type="file"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-top: 5px;
                    color: black;
                }

                .submit-button {
                    padding: 10px;
                    background-color: yellow;
                    color: black;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .submit-button:hover {
                    background-color: yellow;
                }
            `}</style>
        </div>
    );
};


export default GeneralForm;