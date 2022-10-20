import React from 'react';
import { IconFlask, IconChartLine } from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function MainLink({ icon, color, label, to }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>
        <Text component={Link} size='m' to={to}>{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const linkData = [
  { icon: <IconFlask size={16} />, color: 'blue', label: 'Experimental Data', to: '/experimental-data' },
  { icon: <IconChartLine size={16} />, color: 'grape', label: 'Analysis', to: '/analysis' }
];

export function MainLinks() {
  const links = linkData.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}