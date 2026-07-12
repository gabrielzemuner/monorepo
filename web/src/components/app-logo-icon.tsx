import type { SVGAttributes } from "react";

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg {...props} viewBox="0 0 40 42" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2 5.6 8.1 0 0 5.6v30.7L8.1 42l9.1-5.7V5.6Zm5.6 0L31.9 0 40 5.6v30.7L31.9 42l-9.1-5.7V5.6Z"
      />
    </svg>
  );
}
