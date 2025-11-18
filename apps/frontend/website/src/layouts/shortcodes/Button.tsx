/**
 * Simple anchor-based button used in MDX shortcodes.
 * Supports primary/outline styles and custom rel attributes.
 */
const Button = ({
  label,
  link,
  style,
  rel,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
}) => {
  return (
    <a
      className={`btn mb-4 me-4 hover:text-white hover:no-underline ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
      href={link}
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      target="_blank"
    >
      {label}
    </a>
  );
};

export default Button;
