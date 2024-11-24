import React, { useState, useEffect } from "react";
import JsonEditor from "./JsonEditor";
import Form from "./Form";
import Navbar from "./Navbar";


const Home: React.FC = () => {
    const initialJsonData = {
        name: "",
        email: "",
        companySize: "",
        industry: "",
        timeline: "",
        comments: "",
    };

    const [formData, setFormData] = useState(initialJsonData);

    // Handle form submission (update formData state)
    const handleFormSubmit = (data: typeof initialJsonData) => {
        console.log("Form Submitted", data);
        setFormData(data);
    };

    // Handle JSON editor update
    const handleJsonUpdate = (newJson: string) => {
        try {
            const parsedJson = JSON.parse(newJson);
            setFormData(parsedJson);
        } catch (err) {
            console.error("Invalid JSON format", err);
        }
    };

      useEffect(() => {
        console.log("formData updated:", formData); // Optional for debugging
      }, [formData]);

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 dark:bg-neutral-900 min-h-screen">

                {/* JsonEditor section with custom classes */}
                <div className="bg-gray-50 dark:bg-gray-900 shadow-md rounded-lg p-6 lg:pr-12">
                    <JsonEditor jsonData={formData} onUpdate={handleJsonUpdate} />
                </div>

                {/* Form section with custom classes */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 lg:pl-12">
                    <Form onSubmit={handleFormSubmit} formData={formData} />
                </div>

            </div>


        </>

    );
};

export default Home;
