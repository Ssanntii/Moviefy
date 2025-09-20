import PropTypes from "prop-types";

const Button = ({ children, className = "", onClick, small = false, ...props }) => {
  const baseClasses = `
    cursor-pointer 
    border-4 border-transparent 
    bg-red-500 text-white 
    rounded-lg 
    px-7 py-2 text-2xl font-semibold
    shadow-[0px_0px_7px_8px_rgba(255,0,0,0.3)]
    hover:shadow-[0px_0px_7px_15px_rgba(255,0,0,0.3)]
    transition-shadow duration-300 ease-in-out
    relative
    focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50
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
    border-2 border-white 
    bg-transparent text-white 
    rounded-lg 
    px-7 py-2 text-2xl font-semibold
    hover:text-red-500 hover:bg-white
    transition-colors duration-300 ease-in-out
    relative
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
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