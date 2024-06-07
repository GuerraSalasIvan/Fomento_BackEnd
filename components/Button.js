const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${className} inline-flex items-center px-4 py-2 bg-menu-bg-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-menu-bg-700 active:bg-menu-bg-900 focus:outline-none focus:border-menu-bg-900 focus:ring ring-menu-bg-300 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)

export default Button
