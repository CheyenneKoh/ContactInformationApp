import React, {useMemo, useState} from 'react';
import {FieldError} from 'react-hook-form';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {colors, spacing, typography} from 'theme/tokens';
const INPUT_HEIGHT = 40;

type InputType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'number'
  | 'password'
  | 'phone'
  | 'numeric';

type FormControlProps = TextInputProps & {
  type: InputType;
  error?: FieldError;
};

export function FormControl({type, error, ...props}: FormControlProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => setIsFocused(true);
  const handleOnBlur = () => setIsFocused(false);

  const getKeyboardType = useMemo(() => {
    switch (type) {
      case 'email':
        return 'email-address';

      case 'number':
        return 'number-pad';

      case 'phone':
        return 'phone-pad';

      case 'numeric':
        return 'numeric';

      default:
        return 'default';
    }
  }, [type]);

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        Boolean(error) && styles.inputContainerError,
      ]}>
      <TextInput
        style={[styles.inputText, Boolean(error) && styles.inputTextError]}
        keyboardType={getKeyboardType}
        clearButtonMode="never"
        autoCapitalize={type === 'email' ? 'none' : props.autoCapitalize}
        numberOfLines={1}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.white,
    borderColor: colors.surfaceVariant,
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: INPUT_HEIGHT,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  inputText: {
    flexGrow: 1,
    flex: 1,
    padding: 0,
    paddingHorizontal: spacing[4],
    fontSize: typography.base.body,
    color: colors.onSurface,
  },
  inputTextError: {
    color: colors.onErrorContainer,
    opacity: 0.5,
  },
  inputTextDisabled: {
    opacity: 0.5,
  },
});
