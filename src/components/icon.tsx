import type { SVGProps } from "react";

type IconName =
  | "brain"
  | "shield"
  | "chip"
  | "robot"
  | "leaf"
  | "building"
  | "network"
  | "heart"
  | "cube"
  | "advisory"
  | "expert"
  | "research"
  | "prototype"
  | "test"
  | "training"
  | "problem"
  | "facility"
  | "search"
  | "arrow"
  | "arrow-down"
  | "external"
  | "mail"
  | "phone"
  | "pin"
  | "doc"
  | "check"
  | "menu"
  | "close";

const paths: Record<IconName, React.ReactNode> = {
  brain: (
    <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5.83A3 3 0 0 0 6 17a3 3 0 0 0 3 3 2.5 2.5 0 0 0 2.5-2.5V5.5A2.5 2.5 0 0 0 9 3Zm6 0a2.5 2.5 0 0 0-2.5 2.5v12A2.5 2.5 0 0 0 15 20a3 3 0 0 0 3-3 3 3 0 0 0 1-5.17A3 3 0 0 0 18 6a3 3 0 0 0-3-3Z" />
  ),
  shield: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 4 4 1.5V11c0 3.3-2 6.5-4 7.8V6Z" />,
  chip: (
    <path d="M9 2v2H7a3 3 0 0 0-3 3v2H2v2h2v2H2v2h2a3 3 0 0 0 3 3h2v2h2v-2h2v2h2v-2a3 3 0 0 0 3-3h2v-2h-2v-2h2V9h-2V7a3 3 0 0 0-3-3h-2V2h-2v2h-2V2H9Zm-1 6h8v8H8V8Z" />
  ),
  robot: (
    <path d="M11 2v2H8a3 3 0 0 0-3 3v1H3v8h2v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1h2V8h-2V7a3 3 0 0 0-3-3h-3V2h-2Zm-1 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
  ),
  leaf: <path d="M20 3c-9 0-16 3-16 11a6 6 0 0 0 1 3l-2 3 1.6 1L6 18a6 6 0 0 0 3 1c8 0 11-7 11-16ZM8 16c2-5 5-8 9-9-1.5 5-4.5 8-9 9Z" />,
  building: (
    <path d="M3 21V5l8-3 8 3v16h-5v-5h-6v5H3Zm5-9h2v-2H8v2Zm0-4h2V6H8v2Zm6 4h2v-2h-2v2Zm0-4h2V6h-2v2Z" />
  ),
  network: (
    <path d="M12 2a3 3 0 0 0-1 5.83V10H6a2 2 0 0 0-2 2v2.17a3 3 0 1 0 2 0V12h12v2.17a3 3 0 1 0 2 0V12a2 2 0 0 0-2-2h-5V7.83A3 3 0 0 0 12 2Z" />
  ),
  heart: <path d="M12 21S3 14.5 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 14.5 12 21 12 21Z" />,
  cube: <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 2.3L5.8 8 12 11.5 18.2 8 12 4.3ZM5 9.7v6.6l6 3.3v-6.6L5 9.7Zm14 0-6 3.3v6.6l6-3.3V9.7Z" />,
  advisory: <path d="M4 4h16v12H7l-3 3V4Zm4 4v2h8V8H8Zm0 4v2h5v-2H8Z" />,
  expert: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0v1H4v-1Z" />,
  research: <path d="M10 2a7 7 0 1 0 4.2 12.6l5.1 5.1 1.4-1.4-5.1-5.1A7 7 0 0 0 10 2Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />,
  prototype: <path d="M4 3h16v4H4V3Zm0 6h10v12H4V9Zm12 0h4v5h-4V9Zm0 7h4v5h-4v-5Z" />,
  test: <path d="M9 2v6L4 18a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-10V2H9Zm2 2h2v4.5l1.6 3.2H9.4L11 8.5V4Z" />,
  training: <path d="m12 3 10 5-10 5L2 8l10-5Zm-6 9.2 6 3 6-3V16c0 1.7-2.7 3-6 3s-6-1.3-6-3v-3.8ZM21 9v6h2V9h-2Z" />,
  problem: <path d="M11 2h2v2h-2V2Zm6.4 2.2 1.4 1.4-1.4 1.4-1.4-1.4 1.4-1.4ZM12 6a6 6 0 0 1 3 11.2V20H9v-2.8A6 6 0 0 1 12 6Zm-3 16h6v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1Z" />,
  facility: <path d="M2 21V8l7-4 7 4v3h6v10h-8v-5h-4v5H2Zm5-9h2v-2H7v2Z" />,
  search: <path d="M10 2a8 8 0 1 0 4.9 14.3l5 5 1.4-1.4-5-5A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" />,
  arrow: <path d="M5 11v2h11l-4 4 1.4 1.4L20 12l-6.6-6.4L12 7l4 4H5Z" />,
  "arrow-down": <path d="M11 4v11l-4-4-1.4 1.4L12 19l6.4-6.6L17 11l-4 4V4h-2Z" />,
  external: <path d="M14 3v2h3.6l-9.3 9.3 1.4 1.4L19 6.4V10h2V3h-7ZM5 5h5V3H3v18h18v-7h-2v5H5V5Z" />,
  mail: <path d="M2 5h20v14H2V5Zm2 2v.4l8 5 8-5V7H4Zm16 2.7-8 5-8-5V17h16V9.7Z" />,
  phone: <path d="M6.6 2 3 3.2C3 13 11 21 20.8 21l1.2-3.6-4.4-1.5-2 2a14 14 0 0 1-5.5-5.5l2-2L6.6 2Z" />,
  pin: <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 4.5A2.5 2.5 0 1 1 12 11a2.5 2.5 0 0 1 0-4.5Z" />,
  doc: <path d="M6 2h8l4 4v16H6V2Zm7 1.5V7h3.5L13 3.5ZM8 12h8v2H8v-2Zm0 4h8v2H8v-2Z" />,
  check: <path d="m9 16.2-3.5-3.5L4 14.2 9 19l11-11-1.4-1.4L9 16.2Z" />,
  menu: <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />,
  close: <path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z" />,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
