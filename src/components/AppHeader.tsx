import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgProps} from 'react-native-svg';
import {colors, spacing, typography} from '../theme/tokens';

type AppHeaderAction = {
  key: string;
  Icon: React.FC<SvgProps>;
  onPress: () => void;
  disabled?: boolean;
};

type AppHeaderProps = {
  title?: string;
  leftActions?: AppHeaderAction[];
  rightActions?: AppHeaderAction[];
};

export const AppHeader = ({
  title,
  leftActions,
  rightActions,
}: AppHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.appHeader, {paddingTop: insets.top + spacing[2]}]}>
      <View style={styles.appHeaderRow}>
        <View style={styles.headerActions}>
          {leftActions?.map(({key, Icon, onPress}) => (
            <Pressable key={key} style={styles.headerButton} onPress={onPress}>
              <Icon width={24} height={24} fill={colors.primary} />
            </Pressable>
          ))}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.headerActions}>
          {rightActions?.map(({key, Icon, onPress, disabled}) => (
            <Pressable
              key={key}
              style={[styles.headerButton]}
              onPress={onPress}
              disabled={disabled}>
              <Icon
                width={24}
                height={24}
                fill={disabled ? colors.outline : colors.primary}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    paddingVertical: spacing[4],
    backgroundColor: colors.white,
    zIndex: 1000,
    elevation: 8,
  },
  appHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.title.medium,
    fontWeight: 'bold',
    color: colors.black,
    letterSpacing: 0.25,
  },
});
