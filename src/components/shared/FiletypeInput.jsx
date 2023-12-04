/**
 * @param {Object} props
 * @param {string} props.id
 * @param {undefined | string} [props.errors]
 * @param {undefined | string} [props.touched]
 * @param {string} props.values
 * @param {React.ChangeEvent<HTMLInputElement>} props.handleChange
 * @param {React.FocusEvent<HTMLInputElement>} props.handleBlur
 */
export default function FiletypeInput({
  id,
  errors,
  values,
  handleChange,
  handleBlur,
  touched,
  ref
}) {
  return (
    <>
      <div>
        <input
          id={id}
          value={values}
          onChange={handleChange}
          onBlur={handleBlur}
          className="relative m-0 block w-full min-w-0 flex-auto rounded bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none file:bg-white"
          type="file"
          ref={ref}
        />
        {errors && touched && (
          <p className="text-sm cabin text-[#fc8181]">{errors}</p>
        )}
      </div>
    </>
  );
}
