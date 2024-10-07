/**
 * Button component receives the property with props
 */

import { Icon } from '@iconify/react';

const Button = ({ classProp, content, click, icon, iconStyle }) => {
  return (
    <button
      className={`${classProp} btn`}
      style={{ zIndex: 1, pointerEvents: 'auto' }}
      onClick={click && click}
    >
      {icon && <Icon icon={icon} style={iconStyle} />}
      {content}
    </button>
  );
};

export default Button;
