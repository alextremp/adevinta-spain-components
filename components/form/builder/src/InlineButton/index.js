import React from 'react'

import PropTypes from 'prop-types'
import {field, createComponentMemo} from '../prop-types'
import MoleculeButtonGroup from '@s-ui/react-molecule-button-group'
import Button from '@s-ui/react-atom-button'

const InlineButton = ({inlineButton, tabIndex, onChange, errors, alerts}) => {
  const errorMessages = errors[inlineButton.id]
  const alertMessages = alerts[inlineButton.id]

  const onClickHandler = value => {
    return onChange(inlineButton.id, value)
  }

  const inlineButtonProps = {
    id: inlineButton.id,
    label: inlineButton.label,
    tabIndex: tabIndex,
    ...(inlineButton.disabled && {
      disabled: true
    }),
    ...(inlineButton.hidden && {
      hidden: true
    }),
    ...(!!errorMessages && {
      errorText: errorMessages.join('\n')
    }),
    ...(!!alertMessages && {
      alertText: alertMessages.join('\n')
    })
  }

  if (inlineButtonProps.hidden) {
    return null
  }

  return (
    <div
      className={`sui-FormBuilder-field sui-FormBuilder-InlineButton sui-FormBuilder-${inlineButtonProps.id ||
        tabIndex}`}
    >
      <MoleculeButtonGroup>
        {inlineButton?.datalist.map(button => (
          <Button
            key={button.text}
            design={button.value === inlineButton.value ? 'solid' : 'outline'}
            onClick={() => onClickHandler(button.value)}
            isSubmit={false}
            isButton
            {...inlineButtonProps}
          >
            {button.text}
          </Button>
        ))}
      </MoleculeButtonGroup>
    </div>
  )
}

InlineButton.displayName = 'InlineButton'
InlineButton.propTypes = {
  inlineButton: field,
  tabIndex: PropTypes.number,
  onChange: PropTypes.func,
  errors: PropTypes.object,
  alerts: PropTypes.object
}

export default React.memo(InlineButton, createComponentMemo('inlineButton'))
