import { Icon } from '@iconify/react/dist/iconify.js';

const ProfileIcon = ({ profileImg, user, iconStyle, iconSize }) => {
  return (
    <div className={`${iconStyle} flex`}>
      <div className='avatar'>
        <div
          className={`${iconSize} rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md`}
        >
          <div>
            {user ? (
              <img src={profileImg} alt='ht logo' />
            ) : (
              <Icon
                icon='solar:user-bold-duotone'
                width={40}
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
