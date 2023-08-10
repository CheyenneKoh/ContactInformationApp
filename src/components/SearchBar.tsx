import IconArrowBack from '@material-symbols/svg-400/outlined/arrow_back.svg';
import IconSearch from '@material-symbols/svg-400/outlined/search.svg';
import React, {useEffect, useRef} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, spacing} from 'theme/tokens';

type SearchBarProps = {
  onChangeText: (value: string) => void;
  onPressBack: () => void;
};

export const SearchBar = ({onChangeText, onPressBack}: SearchBarProps) => {
  const insets = useSafeAreaInsets();
  const searchInputRef = useRef<TextInput>(null);

  const handleOnPressBackButton = () => {
    searchInputRef.current?.clear();
    searchInputRef.current?.blur();

    onPressBack();
  };

  const handleOnPressSearchBar = () => {
    searchInputRef.current?.focus();
  };

  useEffect(() => {
    handleOnPressSearchBar();
  }, []);

  return (
    <View
      style={[styles.searchBarHeader, {paddingTop: insets.top + spacing[2]}]}>
      <View style={styles.searchBarHeaderRow}>
        <Pressable
          style={styles.headerButton}
          onPress={handleOnPressBackButton}>
          <IconArrowBack width={24} height={24} fill={colors.primary} />
        </Pressable>

        <Pressable
          style={styles.pressableContainer}
          onPress={handleOnPressSearchBar}>
          <View style={styles.searchContainer} pointerEvents="none">
            <IconSearch width={20} height={20} fill={colors.outline} />
            <TextInput
              ref={searchInputRef}
              pointerEvents="none"
              style={styles.textInput}
              allowFontScaling
              onChangeText={onChangeText}
              returnKeyType="done"
              placeholder={'Search'}
              placeholderTextColor={colors.outline}
              clearButtonMode="never"
              autoCorrect={false}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarHeader: {
    paddingVertical: spacing[4],
    backgroundColor: colors.white,
    paddingHorizontal: spacing[5],
    zIndex: 1000,
    elevation: 8,
  },
  searchBarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.grey,
    paddingHorizontal: spacing[3],
    alignItems: 'center',
    gap: spacing[3],
    borderRadius: 40 / 2,
    height: 40,
  },
  textInput: {
    color: colors.black,
  },
});
