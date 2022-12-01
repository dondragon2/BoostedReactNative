import { Icon } from '@ui-kitten/components';
import React from 'react';

export const UpIcon = (props: any) => (
  <Icon {...props} name="arrow-ios-upward" />
);

export const DownIcon = (props: any) => (
  <Icon {...props} name="arrow-ios-downward" />
);

export const ShuffleIcon = (props: any) => <Icon {...props} name="shuffle-2" />;

export const PrevIcon = (props: any) => <Icon {...props} name="skip-back" />;

export const PlayIcon = (props: any) => <Icon {...props} name="play-circle" />;

export const PauseIcon = (props: any) => (
  <Icon {...props} name="pause-circle" />
);

export const NextIcon = (props: any) => <Icon {...props} name="skip-forward" />;

export const RepeatIcon = (props: any) => <Icon {...props} name="repeat" />;
