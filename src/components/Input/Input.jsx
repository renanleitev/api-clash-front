import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

// eslint-disable-next-line react-refresh/only-export-components
export const InputType = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  TEXTAREA: 'textarea'
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  keyType: PropTypes.string,
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ])
  ).isRequired,
  setData: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  inputWidth: PropTypes.number
};

function Input({
  label,
  keyName,
  keyType = InputType.TEXT,
  data,
  setData,
  disabled = false,
  inputWidth = 512
}) {
  const handleInput = useCallback(
    (e) => {
      setData({
        ...data,
        [keyName]: e.currentTarget.value
      });
    },
    [data, keyName, setData]
  );

  const isError = () => {
    if (typeof data[keyName] === 'string' && data[keyName] === '') {
      return true;
    }
    if (typeof data[keyName] === 'number' && data[keyName] === 0) {
      return true;
    }
    return false;
  };
  const error = isError();
  const errorText = `${label} não pode ser vazio`;

  return (
    <TextField
      type={keyType}
      label={label}
      value={data[keyName]}
      onChange={handleInput}
      placeholder={label}
      disabled={disabled}
      // Fix label on top of input
      slotProps={{
        inputLabel: { shrink: true },
        htmlInput: { min: 0, step: 'any' }
      }}
      // Textarea
      multiline={keyType === InputType.TEXTAREA}
      rows={2}
      // Style
      fullWidth
      sx={{ width: inputWidth }}
      // Error text
      error={error}
      helperText={error && errorText}
    />
  );
}

export default Input;
