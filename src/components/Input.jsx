import PropTypes from "prop-types";

const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
      className={`border-0 bg-black px-6 py-2 text-base rounded-lg text-gray-300 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 placeholder-gray-500 transition-all duration-200 hover:bg-gray-900 ${props.className || ''}`}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Input;