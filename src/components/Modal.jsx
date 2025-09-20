import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  const closeModal = () => {
    setActive(false);
    if (props.onClose) props.onClose();
  };

  return (
    <div 
      id={props.id} 
      className={`flex items-center justify-center fixed z-[100] top-0 left-0 right-0 bottom-0 overflow-auto bg-black bg-opacity-40 transition-all duration-300 ${
        active ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {React.cloneElement(props.children, { active, onClose: closeModal })}
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  onClose: PropTypes.func,
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);

  return (
    <div 
      ref={contentRef} 
      className={`p-8 bg-gray-900 rounded-lg w-1/2 max-w-4xl relative transition-all duration-300 ease-in-out lg:w-4/5 ${
        props.active 
          ? 'opacity-100 transform translate-y-0 scale-100' 
          : 'opacity-0 transform -translate-y-8 scale-95'
      }`}
    >
      {props.children}
      <button 
        className="absolute right-4 top-4 text-white text-2xl cursor-pointer hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-800"
        onClick={props.onClose}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
  active: PropTypes.bool,
};

export default Modal;