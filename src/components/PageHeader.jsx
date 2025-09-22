import bg from "../assets/footer-bg.jpg"

const PageHeader = (props) => {
  return (
    <div 
      className="pt-20 pb-8 text-center mb-8 relative bg-top bg-cover bg-no-repeat after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[100px] after:bg-gradient-to-t after:from-gray-900 after:to-transparent"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2 className="relative z-[99] text-white text-4xl font-bold">
        {props.children}
      </h2>
    </div>
  )
}

export default PageHeader