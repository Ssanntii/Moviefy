import PropTypes from "prop-types";

const Button = ({ children, className = "", onClick, small = false, ...props }) => {
  const baseClasses = `
    cursor-pointer 
    border-4 border-transparent 
    bg-teal-400 text-white 
    rounded-lg 
    px-7 py-2 text-2xl font-semibold
    shadow-[0px_0px_7px_8px_rgba(20,184,166,0.3)]
    hover:shadow-[0px_0px_7px_15px_rgba(20,184,166,0.4)]
    transition-shadow duration-300 ease-in-out
    relative
    focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50
  `;
  
  const smallClasses = `
    border-2 
    px-6 py-1 text-base
  `;

  const finalClasses = `${baseClasses} ${small ? smallClasses : ''} ${className}`.trim();

  return (
    <button
      className={finalClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const OutlineButton = ({ children, className = "", onClick, small = false, ...props }) => {
  const baseClasses = `
    cursor-pointer 
    border-2 border-teal-400 
    bg-transparent text-teal-400 
    rounded-lg 
    px-7 py-2 text-2xl font-semibold
    hover:text-white hover:bg-teal-400
    transition-colors duration-300 ease-in-out
    relative
    focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50
  `;
  
  const smallClasses = `
    border-2 
    px-6 py-1 text-base
  `;

  const finalClasses = `${baseClasses} ${small ? smallClasses : ''} ${className}`.trim();

  return (
    <button
      className={finalClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  small: PropTypes.bool,
};

OutlineButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  small: PropTypes.bool,
};

export default Button;