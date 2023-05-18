const Button = ({ btnName, classStyles, handleClick }) => (
  <button
    type="button"
    className={`border dark:border-my-black-1 border-my-gray-2 bg-[#00CCBB] minlg:text-lg py-2 px-6 minlg:px-8  font-poppins font-semibold text-my-dark dark:text-white ${classStyles}`}
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
