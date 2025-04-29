import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import FormSection from "./components/FormSection";

function App() {
  const [rollNumber, setRollNumber] = useState("");
  const [form, setForm] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState(0); // To track the current section
  const [formData, setFormData] = useState<any>({}); // To store collected form data
  const [sectionErrors, setSectionErrors] = useState<any>({}); // To track errors in each section

  useEffect(() => {
    if (rollNumber) {
      // Fetch form data after login
      fetch(`https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`)
        .then((response) => response.json())
        .then((data) => setForm(data.form))
        .catch((err) => console.error("Failed to fetch form:", err));
    }
  }, [rollNumber]);

  const handleLogin = (rn: string) => {
    setRollNumber(rn);
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const validateSection = (section: any) => {
    const errors: any = {};
    section.fields.forEach((field: any) => {
      const value = formData[field.fieldId];
      if (field.required && !value) {
        errors[field.fieldId] = "This field is required";
      } else if (field.minLength && value && value.length < field.minLength) {
        errors[field.fieldId] = `Minimum length is ${field.minLength}`;
      } else if (field.maxLength && value && value.length > field.maxLength) {
        errors[field.fieldId] = `Maximum length is ${field.maxLength}`;
      }
    });
    return errors;
  };

  const handleNextSection = () => {
    const section = form.sections[currentSection];
    const errors = validateSection(section);
    setSectionErrors(errors);

    // Only proceed to the next section if there are no errors
    if (Object.keys(errors).length === 0) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevSection = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dynamic Form App</h1>
      {rollNumber ? (
        <>
          <p>Welcome, Roll Number: {rollNumber}</p>
          {form ? (
            <>
              <div>
                {form.sections[currentSection] && (
                  <FormSection
                    key={form.sections[currentSection].sectionId}
                    section={form.sections[currentSection]}
                    onFieldChange={handleFieldChange}
                    errors={sectionErrors}
                  />
                )}
              </div>
              <div>
                <button
                  onClick={handlePrevSection}
                  disabled={currentSection === 0}
                >
                  Previous
                </button>
                {currentSection < form.sections.length - 1 ? (
                  <button onClick={handleNextSection}>Next</button>
                ) : (
                  <button onClick={handleSubmit}>Submit</button>
                )}
              </div>
            </>
          ) : (
            <p>Loading form...</p>
          )}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
