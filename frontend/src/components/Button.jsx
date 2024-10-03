/**
 * Button component receives the property with props
 */

import { Icon } from '@iconify/react';

const Button = ({ classProp, content, click, icon }) => {
  return (
    <button
      className={`${classProp} btn hover:bg-gray-200`}
      style={{ zIndex: 1, pointerEvents: 'auto' }}
      onClick={click && (() => click())}
    >
      {icon && <Icon icon={icon} />}
      {content}
    </button>
  );
};

export default Button;