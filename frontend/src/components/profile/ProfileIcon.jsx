import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const ProfileIcon = ({ photo, user, iconStyle, iconSize, width, height }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`${iconStyle} flex`}>
      <div className='avatar'>
        <div
          className={`${iconSize} rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md`}
        >
          <div>
            {user && photo && !imgError ? (
              <img
                src={photo}
                alt='Profile logo'
                onError={() => setImgError(true)}
              />
            ) : (
              <Icon
                icon='solar:user-bold-duotone'
                width={width}
                height={height}
                style={{ padding: '4px' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
