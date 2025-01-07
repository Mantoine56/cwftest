import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Link } from '@fluentui/react/lib/Link';

interface FooterLinkProps {
  text: string;
  href: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ text, href }) => (
  <Link
    href={href}
    styles={{
      root: {
        color: '#fff',
        textDecoration: 'none',
        padding: '0 12px',
        fontSize: 14,
        selectors: {
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    }}
  >
    {text}
  </Link>
);

export const Footer: React.FC = () => {
  return (
    <Stack
      horizontal
      horizontalAlign="center"
      verticalAlign="center"
      styles={{
        root: {
          backgroundColor: '#2B3B52',
          padding: '16px 0',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Stack
        horizontal
        tokens={{ childrenGap: 8 }}
        styles={{
          root: {
            alignItems: 'center',
          },
        }}
      >
        <FooterLink text="About CWF" href="#about" />
        <Text
          styles={{
            root: {
              color: 'rgba(255, 255, 255, 0.4)',
              padding: '0 8px',
            },
          }}
        >
          |
        </Text>
        <FooterLink text="Support" href="#support" />
        <Text
          styles={{
            root: {
              color: 'rgba(255, 255, 255, 0.4)',
              padding: '0 8px',
            },
          }}
        >
          |
        </Text>
        <FooterLink text="Other" href="#other" />
      </Stack>
    </Stack>
  );
};
