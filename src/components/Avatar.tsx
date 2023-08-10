import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from 'theme/tokens';

const AVATAR_SIZE_DEFAULT = 40;
const AVATAR_SIZE_LARGE = 100;

type AvatarProps = {
  size?: 'large';
};

export const Avatar = ({size}: AvatarProps) => {
  return (
    <View style={[styles.avatar, size === 'large' && styles.avatarLarge]} />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: AVATAR_SIZE_DEFAULT,
    height: AVATAR_SIZE_DEFAULT,
    borderRadius: AVATAR_SIZE_DEFAULT / 2,
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  avatarLarge: {
    width: AVATAR_SIZE_LARGE,
    height: AVATAR_SIZE_LARGE,
    borderRadius: AVATAR_SIZE_LARGE / 2,
  },
});
