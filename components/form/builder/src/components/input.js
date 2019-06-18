import React from 'react'
import PropTypes from 'prop-types'

import MoleculeInputField from '@s-ui/react-molecule-input-field'
import WithValidator from '../validatorHoC/WithValidator'

const Input = ({
  type,
  field,
  errorText,
  label,
  id,
  value,
  placeholder,
  onChange,
  onError,
  ...props
}) => {
  onError({[field]: errorText})
  return (
    <MoleculeInputField
      {...props}
      type={type}
      errorText={errorText}
      label={label}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={(_, {value}) => onChange(value)}
    />
  )
}

Input.displayName = 'Input'

Input.propTypes = {
  type: PropTypes.string,
  field: PropTypes.string,
  errorText: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func
}

export default WithValidator(Input)
