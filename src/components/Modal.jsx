import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div 
      id={props.id} 
      className={`flex items-center justify-center fixed z-[100] top-0 left-0 right-0 bottom-0 overflow-auto bg-black bg-opacity-40 transition-opacity duration-300 ${
        active ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("opacity-100");
    contentRef.current.parentNode.classList.add("opacity-0");
    contentRef.current.parentNode.classList.add("invisible");
    if (props.onClose) props.onClose();
  };

  return (
    <div 
      ref={contentRef} 
      className={`p-8 bg-gray-900 w-1/2 relative transition-all duration-600 ease-in-out lg:w-4/5 ${
        contentRef.current?.parentNode?.classList?.contains('opacity-100') 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform -translate-y-[250px]'
      }`}
    >
      {props.children}
      <div 
        className="absolute right-1.5 top-1.5 text-2xl cursor-pointer hover:text-red-500 transition-colors"
        onClick={closeModal}
      >
        <X size={24} />
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

export default Modal;