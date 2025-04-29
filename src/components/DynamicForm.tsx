import React, { useState } from "react";
import FormSection from "./FormSection";

const DynamicForm = ({ form }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const currentSection = form.sections[sectionIndex];

  const handleSectionSubmit = (sectionData, sectionErrors) => {
    if (Object.keys(sectionErrors).length === 0) {
      setFormData(prev => ({ ...prev, ...sectionData }));
      setSectionIndex(prev => prev + 1);
    } else {
      setErrors(sectionErrors);
    }
  };

  const handleFinalSubmit = (sectionData, sectionErrors) => {
    if (Object.keys(sectionErrors).length === 0) {
      const finalData = { ...formData, ...sectionData };
      console.log("Submitted Data: ", finalData);
    } else {
      setErrors(sectionErrors);
    }
  };

  return (
    <div>
      <h2>{form.formTitle}</h2>
      <FormSection
        section={currentSection}
        initialData={formData}
        onNext={sectionIndex === form.sections.length - 1 ? handleFinalSubmit : handleSectionSubmit}
        onPrev={() => setSectionIndex(prev => prev - 1)}
        showPrev={sectionIndex > 0}
        showNext={sectionIndex < form.sections.length - 1}
        showSubmit={sectionIndex === form.sections.length - 1}
        errors={errors}
      />
    </div>
  );
};

export default DynamicForm;
