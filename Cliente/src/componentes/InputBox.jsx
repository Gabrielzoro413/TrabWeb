function InputBox({ type = "text", label,value, onChange }) {
  return (
    <div className="flex flex-col">
    <label className="text-sm ml-2" htmlFor={label.toLowerCase()}>
      {label}
    </label>
    <input
      className=" mb-2 px-4 py-2 border border-gray-500  rounded-full focus:outline-none focus:border-blue-500 transition-colors duration-500"
      type={type}
      name={label.toLowerCase()}
      value={value}
      id={label.toLowerCase()}
      onChange={onChange}
    />
  </div>
  );
}

export default InputBox;