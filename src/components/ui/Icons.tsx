import type { SVGProps } from 'react';

/**
 * Inline SVG icon set.
 *
 * Hand-rolled rather than pulled from an icon package: the site uses a dozen
 * glyphs, and inlining them costs nothing at runtime and ships no dependency.
 * All are decorative by default (aria-hidden) — meaning always comes from
 * adjacent text.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PawIcon = (props: IconProps) => (
  <Icon {...props}>
    <ellipse cx="6.5" cy="10" rx="2" ry="2.6" />
    <ellipse cx="10.5" cy="6.4" rx="2" ry="2.7" />
    <ellipse cx="15" cy="6.6" rx="2" ry="2.7" />
    <ellipse cx="18.4" cy="10.6" rx="2" ry="2.5" />
    <path d="M12.3 12.2c2.6 0 4.6 1.9 5.1 4.1.5 2.2-1 3.9-3.2 3.9-1 0-1.6-.4-2.4-.4s-1.4.4-2.4.4c-2.2 0-3.7-1.7-3.2-3.9.5-2.2 2.5-4.1 5.1-4.1Z" />
  </Icon>
);

export const StethoscopeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 3v5a4.5 4.5 0 0 0 9 0V3" />
    <path d="M3.5 3h3M12.5 3h3" />
    <path d="M9.5 12.5v2a5.5 5.5 0 0 0 11 0v-1" />
    <circle cx="20.5" cy="11" r="2" />
  </Icon>
);

export const BathIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 11h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2Z" />
    <path d="M6 11V5.5A2.5 2.5 0 0 1 8.5 3c1.2 0 2.1.8 2.4 1.9" />
    <path d="M6.5 20.5 5.5 22M17.5 20.5l1 1.5" />
    <circle cx="11" cy="5.6" r=".6" fill="currentColor" />
  </Icon>
);

export const PinIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Icon>
);

export const BoltIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M13.5 2 4.5 13.5h6L10 22l9.5-11.5h-6L13.5 2Z" />
  </Icon>
);

export const ChatIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.3-.6L3 21l1.8-4.4A8.2 8.2 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
  </Icon>
);

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Icon>
);

export const ShieldCheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 22s8-3.5 8-9.5V5.5L12 2.5 4 5.5V12.5C4 18.5 12 22 12 22Z" />
    <path d="m8.8 12 2.3 2.3 4.3-4.6" />
  </Icon>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Icon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const ClockIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Icon>
);

export const AlertIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.2" />
    <circle cx="12" cy="16.3" r=".9" fill="currentColor" stroke="none" />
  </Icon>
);

export const WhatsAppIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35Z" />
    <path d="M12.04 2C6.6 2 2.17 6.43 2.16 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.86 9.86 0 0 0 4.7 1.2h.01c5.44 0 9.87-4.43 9.88-9.87a9.8 9.8 0 0 0-2.89-6.99A9.8 9.8 0 0 0 12.04 2Zm5.8 15.67a8.2 8.2 0 0 1-5.8 2.4h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.21-8.2a8.15 8.15 0 0 1 5.8 2.41 8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Z" />
  </svg>
);

export const BowlIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M2 12h20M4 12a8 8 0 0 0 16 0" />
  </Icon>
);

export const BoneIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-5 5c-.7.7-1.69 0-2.5 0a2.5 2.5 0 1 0 0 5 .5.5 0 0 1 .5.5 2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5l5-5Z" />
  </Icon>
);

export const PackageIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </Icon>
);
