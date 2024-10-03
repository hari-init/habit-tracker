

const ProfileDetails=(props)=>{
    return(
        <div>
        <p className='text-lg font-bold'>{props.count}</p>
        <p className='text-gray-500 text-sm'>{props.name}</p>
      </div>
    )
}

export default ProfileDetails;
