import { KeyboardEventHandler, MouseEventHandler, useRef } from 'react';
import { useTabsContext } from '../context/TabsContext';

export const useTab = () => {
  const { changeTab } = useTabsContext();
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const onClickTab: MouseEventHandler<HTMLLIElement> = (event) => {
    changeTab(event.currentTarget.id);
  };

  const onKeyDownEnterTab: KeyboardEventHandler<HTMLLIElement> = async (event) => {
    if (event.key === 'Enter' && anchorRef.current) {
      await changeTab(event.currentTarget.id);

      anchorRef.current.click();
    }
  };

  return { anchorRef, onClickTab, onKeyDownEnterTab };
};
