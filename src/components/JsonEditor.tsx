
import React from "react";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type JsonEditorProps = {
    jsonData: Record<string, any>;
    onUpdate: (newJson: string) => void;
};

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonData, onUpdate }) => {
    const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(jsonData, null, 2));
    const [error, setError] = useState<string | null>(null);

    const initialJsonData = {
        name: "",
        email: "",
        companySize: "",
        industry: "",
        timeline: "",
        comments: "",
    };

    // Update jsonInput when jsonData changes
    useEffect(() => {
        try {
            setJsonInput(JSON.stringify(jsonData, null, 2));
            setError(null);
        } catch (err) {
            setError("Invalid JSON data.");
        }
    }, [jsonData]);

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setJsonInput(input);
        try {
            const parsedJson = JSON.parse(input);
            setError(null);
            if (input !== JSON.stringify(parsedJson, null, 2)) {
                onUpdate(parsedJson); // Only update if the JSON is valid and has been parsed correctly
            }
        } catch (err) {
            setError("Invalid JSON format.");
            // Ensure that onUpdate is NOT called when JSON is invalid
        }
    };


    const handleSave = () => {
        try {
            const parsedJson = JSON.parse(jsonInput);  // Parse the current input value
            onUpdate(JSON.stringify(parsedJson, null, 2)); // Save it as a string
        } catch (err) {
            setError("Invalid JSON format.");
        }
    };

    const handleDownloadJson = () => {
        // Validate JSON (This can be more complex if needed, for example by checking if required fields are filled)
        if (
            jsonData.name &&
            jsonData.email &&
            jsonData.companySize &&
            jsonData.industry &&
            jsonData.timeline
        ) {
            const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "json-data.json";
            a.click();

            URL.revokeObjectURL(url);
        } else {
            toast.error("You must fill out the form completely and correctly before downloading the data.");
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">JSON Editor</h3>
            <p className="text-red-400 mb-7">Modify the JSON to reflect your form schema.</p>

            <textarea
                value={jsonInput}
                onChange={handleJsonChange}
                rows={10}
                cols={50}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                data-testid="textBox"
            />
            {error && <p className="text-red-500 text-sm mt-2 mb-5">{error}</p>}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
    <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full sm:w-auto"
    >
        Update JSON
    </button>

    <button
        type="button"
        onClick={handleDownloadJson}
        className={`w-full sm:w-auto px-4 py-2 rounded-lg ${
            jsonData.name &&
            jsonData.email &&
            jsonData.companySize &&
            jsonData.industry &&
            jsonData.timeline
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500"
        }`}
    >
        Download JSON
    </button>

    <button
        type="reset"
        className="w-full sm:w-auto focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={() => setJsonInput(JSON.stringify(initialJsonData, null, 2))}
    >
        Reset
    </button>
</div>
        </div>
    );
};

export default JsonEditor;
