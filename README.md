# Dynamic Form Generator

This project is a dynamic form generator built using React, TypeScript, and Vite. It allows users to create and manage forms by inputting JSON data. The form features include field validation, dark mode, and the ability to download form submissions as JSON.

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Raj2raaz/Dynamic_Form_Generator.git
cd dynamic-form-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm run dev
```
This will start the app on http://localhost:5173 by default.

### 4. Build the app for production

```bash
npm run build
```
This command builds the project for production, optimizing your assets and preparing the app for deployment.


## 📄 Example JSON Schemas

To dynamically generate forms, use a JSON schema like the one below:

```json
{
  "name": "",
  "email": "",
  "companySize": "",
  "industry": "",
  "timeline": "",
  "comments": ""
}
```
* name: (string) Your full name

* email: (string) Your email address

* companySize: (string) The size of your company

* industry: (string) The industry you're in (e.g., tech, healthcare, finance, etc.)

* timeline: (string) The timeline for your project

* comments: (string) Any additional comments or requests


## 🛠 Local Development Guide

### 1. Start the development server

```bash
npm run dev
```

This will launch the app locally and you can view it in your browser.

### 2. Make changes in the src/ directory

Any updates to components, styles, or JSON data files will be automatically reflected in the app.

### 3. Run test

```bash
npm run test
```
Use this command to run tests with Jest, ensuring the application behaves as expected.



## 🎮 Features (Bonus Points)

###  1. Add a "Copy Form JSON" button

Users can copy the form JSON to their clipboard, making it easy to share or reuse.

###  2. Implement form field validation preview

This feature shows real-time validation feedback as users fill out the form, ensuring accurate data entry.

###  3. Add dark mode support

Dark mode is available for better user experience in low-light environments. This can be toggled via the UI.

###  4. Add the ability to download form submissions as JSON

Once the form is submitted, users can download the submitted data as a JSON file.



## ⚙️ Technologies Used

React for building the user interface

Tailwind CSS for styling the app

React Hook Form for form management and validation

React JSON View for displaying and editing JSON data


##  📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

```markdown

### Key Features:
- **Setup Instructions**: Clear steps to clone, install dependencies, and run the app locally.
- **Example JSON Schema**: Describes how the JSON data should be structured to generate forms.
- **Local Development Guide**: Provides steps for starting the server, editing files, and running tests.
- **Bonus Features**: Describes added functionality such as copying the form JSON, real-time validation, dark mode, and JSON download.
  
You can copy this directly and adjust the information to match your actual project or requirements.


```



























