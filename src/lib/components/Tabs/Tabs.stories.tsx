import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

import { Container } from '../..';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: {
        type: 'radio',
      },
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    align: {
      control: {
        type: 'select',
      },
      table: {
        defaultValue: { summary: 'between' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          color: '#3c3c3c',
          fontSize: '2rem',
          fontWeight: 'bold',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          margin: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultTabId: 'item1-tab',
    direction: 'horizontal',
    align: 'between',
  },

  render: (args) => {
    return (
      <>
        <Tabs {...args}>
          <Tabs.List>
            <Tabs.Tab tabPanelId='item1'>ITEM ONE</Tabs.Tab>
            <Tabs.Tab tabPanelId='item2'>ITEM TWO</Tabs.Tab>
            <Tabs.Tab tabPanelId='item3'>ITEM THREE</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel id='item1'>
            <Container css={{ margin: '2rem' }}>Item One</Container>
          </Tabs.Panel>
          <Tabs.Panel id='item2'>
            <Container css={{ margin: '2rem' }}>Item Two</Container>
          </Tabs.Panel>
          <Tabs.Panel id='item3'>
            <Container css={{ margin: '2rem' }}>Item Three</Container>
          </Tabs.Panel>
        </Tabs>
      </>
    );
  },
};

// const hexToRgba = (hex?: CSSProperties['backgroundColor'], opacity: number = 1) => {
//   if (!hex) return;

//   // #을 제거하고 앞에 '0x'를 붙여 16진수를 10진수로 변환
//   const r = parseInt(String(hex).slice(1, 3), 16);
//   const g = parseInt(String(hex).slice(3, 5), 16);
//   const b = parseInt(String(hex).slice(5, 7), 16);

//   // RGBA 문자열로 반환
//   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };
