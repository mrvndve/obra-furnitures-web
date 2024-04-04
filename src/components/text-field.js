import React, {
  forwardRef,
  memo
} from 'react';

import { TextField as InputField } from '@mui/material';

const TextField = forwardRef(({
  name,
  label,
  readOnly,
  size = 'small',
  error = null,
  ...rest
}, ref) => {
  return <>
    <InputField
      name={name}
      label={label}
      fullWidth
      size={size}
      error={Boolean(error)}
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly: readOnly }}
      helperText={error?.message}
      ref={ref}
      {...rest}
    />
  </>;
});

export default memo(TextField);