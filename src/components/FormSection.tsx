import React from "react";

interface FormField {
  fieldId: string;
  type: "text" | "tel" | "email" | "textarea" | "date" | "dropdown" | "radio" | "checkbox";
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  minLength?: number;
  maxLength?: number;
}

interface FormSectionProps {
  section: {
    sectionId: number;
    title: string;
    description: string;
    fields: FormField[];
  };
  onFieldChange: (fieldId: string, value: string) => void;
  errors: any;
}

const FormSection = ({ section, onFieldChange, errors }: FormSectionProps) => {
  return (
    <div>
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      {section.fields.map((field) => (
        <div key={field.fieldId}>
          <label>{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              placeholder={field.placeholder}
              onChange={(e) => onFieldChange(field.fieldId, e.target.value)}
              required={field.required}
            />
          ) : field.type === "dropdown" ? (
            <select
              onChange={(e) => onFieldChange(field.fieldId, e.target.value)}
              required={field.required}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            <div>
              {field.options?.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    name={field.fieldId}
                    value={option.value}
                    onChange={(e) => onFieldChange(field.fieldId, e.target.value)}
                    required={field.required}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              onChange={(e) => onFieldChange(field.fieldId, e.target.value)}
              required={field.required}
            />
          )}
          {errors[field.fieldId] && <p style={{ color: "red" }}>{errors[field.fieldId]}</p>}
        </div>
      ))}
    </div>
  );
};

export default FormSection;
