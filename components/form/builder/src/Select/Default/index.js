import React, {useCallback} from 'react'

import PropTypes from 'prop-types'
import {field, createComponentMemo} from '../../prop-types'

import MoleculeSelectField from '@s-ui/react-molecule-select-field'
import MoleculeSelectOption from '@s-ui/react-molecule-dropdown-option'
import IconChevronDown from '../../Icons/IconChevronDown'

const DefaultSelect = ({
  select,
  tabIndex,
  onChange,
  onBlur,
  size,
  errors,
  alerts
}) => {
  const errorMessages = errors[select.id]
  const alertMessages = alerts[select.id]

  const onChangeCallback = useCallback(
    (evt, {value}) => {
      return onChange(select.id, value)
    },
    [onChange, select]
  )

  const onBlurCallback = () => onBlur(select.id)

  const {datalist = []} = select

  // transform constraints to props
  const constraints = select.constraints || []
  let constraintsProps = {}
  constraintsProps = constraints.reduce((acc, constraint) => {
    if (constraint?.property?.notnull === '') {
      return {
        ...acc,
        required: true
      }
    } else {
      return acc
    }
  }, constraintsProps)

  const selectProps = {
    id: select.id,
    label: select.label,
    name: select.name,
    placeholder: select.hint,
    iconArrowDown: <IconChevronDown />,
    value: select.value || '',
    onChange: onChangeCallback,
    onBlur: onBlurCallback,
    tabIndex,
    ...(select.disabled && {
      disabled: true
    }),
    ...(select.hidden && {
      hidden: true
    }),
    ...(!!errorMessages && {
      errorText: errorMessages.join('\n')
    }),
    ...(!!alertMessages && {
      alertText: alertMessages.join('\n')
    }),
    selectSize: size,
    ...constraintsProps
  }

  if (selectProps.hidden) {
    return null
  }

  return (
    <div
      className={`sui-FormBuilder-field sui-FormBuilder-DefaultSelect sui-FormBuilder-${selectProps.id}`}
    >
      {selectProps.label && (
        <label className="sui-FormBuilder-label" htmlFor={selectProps.id}>
          {selectProps.label}
        </label>
      )}
      <MoleculeSelectField {...selectProps}>
        {datalist.map(data => (
          <MoleculeSelectOption key={data.value} value={data.value}>
            {data.text}
          </MoleculeSelectOption>
        ))}
      </MoleculeSelectField>
    </div>
  )
}

DefaultSelect.displayName = 'DefaultSelect'
DefaultSelect.propTypes = {
  select: field,
  tabIndex: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.string,
  errors: PropTypes.object,
  alerts: PropTypes.object
}

export default React.memo(DefaultSelect, createComponentMemo('select'))
