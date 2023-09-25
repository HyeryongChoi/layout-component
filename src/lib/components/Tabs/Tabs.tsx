import { ComponentPropsWithoutRef, MouseEventHandler, PropsWithChildren, memo } from 'react';
import { styled, css } from 'styled-components';
import TabsProvider, { useTabsContext } from '../../context/TabsContext';
import { Flex } from '../..';

export type TabDirection = 'horizontal' | 'vertical';

export interface TabsProps extends PropsWithChildren {
  /** 기본 탭을 설정하는 속성입니다. */
  defaultTabId: string;
  /** 탭의 방향을 설정하는 속성입니다. 수평 또는 수직 방향으로 탭을 배치할 수 있습니다. */
  direction?: TabDirection;
  /** 탭의 폰트 색상과 하단 경계선의 색상을 지정하는 속성입니다. 기본 값은 Cornflowerblue입니다. */
  primaryColor?: string;
}

const Tabs = (props: TabsProps) => {
  const { defaultTabId, direction, primaryColor, children } = props;
  const flexDirection = direction === 'horizontal' ? 'column' : 'row';

  return (
    <TabsProvider defaultTabId={defaultTabId} direction={direction} primaryColor={primaryColor}>
      <Flex direction={flexDirection}>{children}</Flex>
    </TabsProvider>
  );
};

interface ListProps extends ComponentPropsWithoutRef<'ul'> {}

const List = (props: ListProps) => {
  const { children, ...restProps } = props;
  const { direction } = useTabsContext();
  const flexDirection = direction === 'horizontal' ? 'row' : 'column';

  return (
    <Flex
      tag='ul'
      direction={flexDirection}
      role='tablist'
      {...restProps}
      css={{ width: '100%', listStyle: 'none', margin: '0', padding: '0' }}
    >
      {children}
    </Flex>
  );
};

interface TabProps extends ComponentPropsWithoutRef<'li'> {
  /** 탭과 탭패널 요소를 연결하기 위한 속성입니다. */
  tabPanelId: string;
}

const Tab = (props: TabProps) => {
  const { tabPanelId, children, ...restProps } = props;
  const { selectedTabId, changeTab, direction, primaryColor } = useTabsContext();
  const isSelected = tabPanelId === selectedTabId.slice(0, -4); // '-tab'을 제외한 부분 추출

  const onClickTab: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();

    changeTab(event.currentTarget.id);
  };

  return (
    <TabWrapper
      id={`${tabPanelId}-tab`}
      role='tab'
      tabIndex={0}
      aria-selected={isSelected}
      aria-controls={tabPanelId}
      direction={direction}
      selected={isSelected}
      onClick={onClickTab}
      primaryColor={primaryColor}
      {...restProps}
    >
      <TabAnchor href={tabPanelId}>{children}</TabAnchor>
    </TabWrapper>
  );
};

interface PanelProps extends ComponentPropsWithoutRef<'section'> {
  /** 탭 패널의 식별자를 지정하는 속성입니다.*/
  id: string;
}

const Panel = (props: PanelProps) => {
  const { id, children, ...restProps } = props;
  const { selectedTabId } = useTabsContext();
  const isSelected = id === selectedTabId.slice(0, -4); // '-tab'을 제외한 부분 추출

  return (
    isSelected && (
      <TabPanelWrapper
        id={id}
        tabIndex={0}
        role='tabpanel'
        aria-labelledby={`${id}-tab`}
        aria-expanded={isSelected}
        {...restProps}
      >
        {children}
      </TabPanelWrapper>
    )
  );
};

Tabs.List = List;
Tabs.Tab = memo(Tab);
Tabs.Panel = Panel;

export default Tabs;

const TabWrapper = styled.li<
  Omit<TabProps, 'tabPanelId'> & { selected: boolean; direction: TabDirection; primaryColor: string }
>`
  position: relative;

  width: 100%;
  padding: 1.6rem;

  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: Lightsteelblue;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s ease;

  ${({ direction }) =>
    css`
      &::after {
        content: '';
        position: absolute;

        width: 100%;
        height: 100%;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        ${direction === 'horizontal'
          ? `border-bottom: 5px solid Lightsteelblue`
          : `border-right: 5px solid Lightsteelblue`};
      }
    `}

  ${({ primaryColor, selected, direction }) =>
    selected &&
    css`
      color: ${primaryColor};

      &::after {
        ${direction === 'horizontal'
          ? `border-bottom: 5px solid ${primaryColor}`
          : `border-right: 5px solid ${primaryColor}`};
      }
    `};
`;

const TabPanelWrapper = styled.section<PanelProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TabAnchor = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
`;