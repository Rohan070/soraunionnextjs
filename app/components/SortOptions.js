// components/SortOptions.js
import { useState } from 'react';

const SortOptions = ({ onChange }) => {
  const options = ['created_at_asc', 'filename_asc', 'filename_desc'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SortOptions;
