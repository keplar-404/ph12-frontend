import Select from "react-select";

export default function OptionComponent({
  options,
  placeholder,
  errors,
  touched,
  handleBlur,
  id,
  value,
  handleChange,
}) {
  const handleChangeLocal = (selectedOption) => {
    handleChange({ target: { id, value: selectedOption?.value || "" } });
  };

  return (
    <>
      <Select
        id={id}
        value={options.find((option) => option.value === value)}
        onChange={handleChangeLocal}
        options={options}
        placeholder={placeholder}
        onBlur={handleBlur}
      />
      {errors && touched && (
        <p className="text-sm cabin text-[#fc8181]">{errors}</p>
      )}
    </>
  );
}
