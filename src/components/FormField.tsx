import React from "react";

const FormField = ({ field, value, onChange, error }) => {
  return (
    <div>
      <label>{field.label}</label>
      {field.type === "text" || field.type === "email" || field.type === "tel" || field.type === "date" ? (
        <input
          type={field.type}
          placeholder={field.placeholder}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      ) : field.type === "textarea" ? (
        <textarea value={value || ""} onChange={e => onChange(e.target.value)} />
      ) : field.type === "dropdown" ? (
        <select value={value || ""} onChange={e => onChange(e.target.value)}>
          <option value="">Select</option>
          {field.options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : null}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FormField;
