import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors, typography} from 'theme/tokens';

type FormFieldLabelProps = {
  text: string;
};

export const FormFieldLabel = ({text}: FormFieldLabelProps) => {
  return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    color: colors.black,
    fontSize: typography.base.body,
    fontWeight: 'bold',
    width: '20%',
  },
});
