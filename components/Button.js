import Link from "next/link";

const Button = ({ children, href, type, onClick, disabled = false }) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={`Button ${!disabled || "Button--disabled"}`}>
          {children}
        </a>
      </Link>
    );
  }
  if (type) {
    return (
      <button
        className={`Button ${!disabled || "Button--disabled"}`}
        type={type}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      className={`Button ${!disabled || "Button--disabled"}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Button;
