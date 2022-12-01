import { Icon, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useDarkMode } from '../themes/hooks';
import { toggle } from '../themes/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useDarkMode();

  const onToggle = () => {
    dispatch(toggle());
  };

  const icon = <Icon name={isDarkMode ? 'sun' : 'moon'} />;

  return <TopNavigationAction icon={icon} onPress={onToggle} />;
};

export default ThemeToggle;
