import { Row, Switch, Text, useTheme } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme as useNextTheme } from 'next-themes';

export const Header = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Row
      align="center"
      justify="space-between"
      css={{ padding: '24px 24px 48px 24px' }}
    >
      <Text
        h1
        size={24}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        Safe Launch
      </Text>
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
