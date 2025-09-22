import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { X } from "lucide-react"

const Modal = (props) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(props.active)
  }, [props.active])

  const closeModal = () => {
    setActive(false)
    if (props.onClose) props.onClose()
  }

  return (
    <div 
      id={props.id} 
      className={`flex items-center justify-center fixed z-[100] top-0 left-0 right-0 bottom-0 overflow-auto bg-opacity-60 backdrop-blur-sm transition-all duration-300 ${
        active ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {React.cloneElement(props.children, { active, onClose: closeModal })}
      </div>
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  onClose: PropTypes.func,
}

export const ModalContent = (props) => {
  const contentRef = useRef(null)

  return (
    <div 
      ref={contentRef} 
      className={`bg-gray-900 rounded-xl w-[80vw] max-w-none mx-4 relative transition-all duration-300 ease-out shadow-2xl border border-gray-700 overflow-hidden ${
        props.active 
          ? 'opacity-100 transform translate-y-0 scale-100' 
          : 'opacity-0 transform -translate-y-8 scale-95'
      }`}
    >
      {props.children}
      <button 
        className="absolute right-3 top-3 text-white text-xl cursor-pointer hover:text-teal-400 transition-colors p-2 rounded-full hover:bg-gray-800 hover:bg-opacity-50 z-10"
        onClick={props.onClose}
        aria-label="Close modal"
      >
        <X size={20} />
      </button>
    </div>
  )
}

ModalContent.propTypes = {
  onClose: PropTypes.func,
  active: PropTypes.bool,
}

export default Modal