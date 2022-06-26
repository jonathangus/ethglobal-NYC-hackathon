import { Row, Switch, Text, useTheme } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme as useNextTheme } from 'next-themes';
import Link from 'next/link';

export const Header = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Row
      align="center"
      justify="space-between"
      css={{ padding: '24px 24px 48px 24px' }}
    >
      <Link href="/" passHref>
        <Text
          h1
          size={20}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            cursor: 'pointer'
          }}
          weight="bold"
        >
          Safe Launch
        </Text>
      </Link>
      <div style={{display:'flex'}}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '24px'}}>
          <span style={{ marginRight: 8, fontSize: 24 }}>
            {isDark ? '🌙' : '☀️'}
          </span>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
        </div>
        <ConnectButton />
      </div>
    </Row>
  );
};
