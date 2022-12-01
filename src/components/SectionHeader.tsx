import {
  Divider,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

interface Props {
  title: string;
}

const themedStyles = StyleService.create({
  root: {
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 8,
  },
  divider: {
    backgroundColor: 'color-primary-1',
    marginTop: 4,
    marginBottom: 8,
    width: '10%',
    height: 2,
  },
});

const SectionHeader: React.FC<Props> = ({ title }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.root}>
      <Text category="h6" style={styles.title}>
        {title}
      </Text>
      <Divider style={styles.divider} />
    </View>
  );
};

export default SectionHeader;
