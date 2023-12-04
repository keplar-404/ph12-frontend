/**
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.type
 * @param {string} props.placeholder
 * @param {undefined | string} [props.errors]
 * @param {undefined | string} [props.touched]
 * @param {string} props.values
 * @param {React.ChangeEvent<HTMLInputElement>} props.handleChange
 * @param {React.FocusEvent<HTMLInputElement>} props.handleBlur
 */

export default function Textarea({
  id,
  type,
  errors,
  placeholder,
  values,
  handleChange,
  handleBlur,
  touched,
}) {
  return (
    <>
      <div>
        <textarea
          id={id}
          type={type}
          className={`w-full rounded-lg p-4 pe-12 text-sm shadow-sm outline-none border ${
            errors ? "focus:border-[#fc8181]" : ""
          }`}
          placeholder={placeholder}
          value={values}
          // defaultValue={}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && touched && (
          <p className="text-sm cabin text-[#fc8181]">{errors}</p>
        )}
      </div>
    </>
  );
}
