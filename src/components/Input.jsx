import PropTypes from "prop-types"

const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
      className={`
        flex-1 h-10
        border-2 border-gray-400 
        bg-gray-800 
        px-4 py-2 
        text-base 
        rounded-lg 
        text-white 
        font-medium 
        focus:outline-none 
        focus:ring-2 
        focus:ring-teal-400 
        focus:ring-opacity-50 
        focus:border-teal-400
        placeholder-gray-300 
        transition-all 
        duration-200 
        hover:border-teal-300 
        hover:bg-gray-700
        shadow-[0_2px_8px_rgba(0,0,0,0.3)]
        ${props.className || ''}
      `}
      {...props}
    />
  )
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
}

export default Input