import React, { useState, useEffect } from "react";
import { extractUIJsonFromImage } from '../service/openai'
import ImageUploader from "../util/ImageUploader";
import JsonUIRendererPage from "../util/JsonUIRendererPage";
import "./comp.css"

const Dashboard = () => {

    const [loading, setloading] = useState(false)





    const handleBase64Image = async (base64Image) => {
        setloading(true)
        const structure = await extractUIJsonFromImage(base64Image);
        setjsonstructure(structure)
        setloading(false)
    };

    const sampleStructure = {
        
        "type": "div",
        "class": "container",
        "style": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "padding": "20px",
            "width": "400px",
            "backgroundColor": "#ffffff",
            "borderRadius": "10px",
            "boxShadow": "0 4px 8px rgba(0, 0, 0, 0.1)"
        },
        "children": [
            {
                "type": "h1",
                "class": "title",
                "style": {
                    "fontSize": "24px",
                    "fontWeight": "bold",
                    "color": "#000000",
                    "marginBottom": "20px"
                },
                "content": "Log in"
            },
            {
                "type": "input",
                "class": "input-email",
                "style": {
                    "width": "100%",
                    "padding": "10px",
                    "marginBottom": "10px",
                    "border": "1px solid #cccccc",
                    "borderRadius": "5px"
                },
                "attributes": {
                    "placeholder": "Enter email"
                }
            },
            {
                "type": "input",
                "class": "input-password",
                "style": {
                    "width": "100%",
                    "padding": "10px",
                    "marginBottom": "20px",
                    "border": "1px solid #cccccc",
                    "borderRadius": "5px"
                },
                "attributes": {
                    "placeholder": "Enter password"
                }
            },
            {
                "type": "button",
                "class": "login-btn",
                "style": {
                    "width": "100%",
                    "padding": "10px",
                    "backgroundColor": "#000080",
                    "color": "#ffffff",
                    "border": "none",
                    "borderRadius": "5px",
                    "fontSize": "16px",
                    "fontWeight": "bold",
                    "marginBottom": "20px"
                },
                "content": "Log in"
            },
            {
                "type": "span",
                "class": "or-text",
                "style": {
                    "fontSize": "14px",
                    "color": "#666666",
                    "marginBottom": "20px"
                },
                "content": "OR"
            },
            {
                "type": "div",
                "class": "social-login",
                "style": {
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "10px",
                    "width": "100%",
                    "marginBottom": "20px"
                },
                "children": [
                    {
                        "type": "button",
                        "class": "google-btn",
                        "style": {
                            "display": "flex",
                            "alignItems": "center",
                            "padding": "10px",
                            "width": "100%",
                            "backgroundColor": "#ffffff",
                            "border": "1px solid #cccccc",
                            "borderRadius": "5px",
                            "fontSize": "16px",
                            "fontWeight": "bold",
                            "color": "#000000"
                        },
                        "children": [
                            {
                                "type": "div",
                                "class": "google-icon",
                                "style": {
                                    "width": "20px",
                                    "height": "20px",
                                    "backgroundColor": "#4285F4",
                                    "borderRadius": "50%",
                                    "marginRight": "10px"
                                }
                            },
                            {
                                "type": "span",
                                "class": "google-text",
                                "content": "Continue with Google"
                            }
                        ]
                    },
                    {
                        "type": "button",
                        "class": "microsoft-btn",
                        "style": {
                            "display": "flex",
                            "alignItems": "center",
                            "padding": "10px",
                            "width": "100%",
                            "backgroundColor": "#ffffff",
                            "border": "1px solid #cccccc",
                            "borderRadius": "5px",
                            "fontSize": "16px",
                            "fontWeight": "bold",
                            "color": "#000000"
                        },
                        "children": [
                            {
                                "type": "div",
                                "class": "microsoft-icon",
                                "style": {
                                    "width": "20px",
                                    "height": "20px",
                                    "backgroundColor": "#F3F3F3",
                                    "borderRadius": "50%",
                                    "marginRight": "10px"
                                }
                            },
                            {
                                "type": "span",
                                "class": "microsoft-text",
                                "content": "Continue with Microsoft"
                            }
                        ]
                    },
                    {
                        "type": "button",
                        "class": "apple-btn",
                        "style": {
                            "display": "flex",
                            "alignItems": "center",
                            "padding": "10px",
                            "width": "100%",
                            "backgroundColor": "#ffffff",
                            "border": "1px solid #cccccc",
                            "borderRadius": "5px",
                            "fontSize": "16px",
                            "fontWeight": "bold",
                            "color": "#000000"
                        },
                        "children": [
                            {
                                "type": "div",
                                "class": "apple-icon",
                                "style": {
                                    "width": "20px",
                                    "height": "20px",
                                    "backgroundColor": "#000000",
                                    "borderRadius": "50%",
                                    "marginRight": "10px"
                                }
                            },
                            {
                                "type": "span",
                                "class": "apple-text",
                                "content": "Continue with Apple"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "span",
                "class": "footer-text",
                "style": {
                    "fontSize": "14px",
                    "color": "#666666",
                    "textAlign": "center"
                },
                "content": "Can't log in? • Already have an account?"
            }
        ]
    }


    const [jsonstructure, setjsonstructure] = useState(sampleStructure)

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading ...</p>
            </div>
        )
    }



    return (
        <div style={{ padding: 10 }}>
            {console.log(jsonstructure, "jsonstructure")}
            <div>
                <h2>Upload Image to Generate React Code</h2>
                <ImageUploader onImageConverted={handleBase64Image} />

                {jsonstructure && <JsonUIRendererPage jsonstructure={jsonstructure} />}

            </div>
        </div>
    )
}

export default Dashboard