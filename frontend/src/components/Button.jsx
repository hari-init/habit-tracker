/**
 * Button component receives the property with props
 */

import { Icon } from '@iconify/react';

const Button = ({ classProp, content, click, icon, iconstyle }) => {
  return (
    <button
      className={`${classProp} btn hover:bg-gray-200`}
      style={{ zIndex: 1, pointerEvents: 'auto' }}
      onClick={() => click()}
    >
      {icon && <Icon icon={icon} style={iconstyle} />}
      {content}
    </button>
  );
};

export default Button;
