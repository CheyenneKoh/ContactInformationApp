import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors, spacing, typography} from 'theme/tokens';
import {Avatar} from './Avatar';

type ContactItemProps = {
  firstName: string;
  lastName: string;
  onPress: () => void;
};

export const ContactItem = ({
  firstName,
  lastName,
  onPress,
}: ContactItemProps) => {
  const handleOnPress = () => {
    onPress();
  };

  return (
    <Pressable
      style={({pressed}) => [
        styles.contactItem,
        pressed && styles.contactItemPressed,
      ]}
      onPress={handleOnPress}>
      <Avatar />

      <Text style={[styles.text, styles.nameText]}>
        {`${firstName} ${lastName}`}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
    borderBottomColor: colors.surfaceVariant,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: typography.base.bodyLarge,
    letterSpacing: 0.25,
    color: colors.black,
  },
  nameText: {
    flex: 1,
  },
  contactItemPressed: {
    opacity: 0.5,
  },
});
