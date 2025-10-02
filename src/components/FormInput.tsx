import React from "react";

interface Props {
  type: string;
  placeholder: string;
}

const FormInput: React.FC<Props> = ({ type, placeholder }) => {
  return <input type={type} placeholder={placeholder} className="input" />;
};

export default FormInput;
