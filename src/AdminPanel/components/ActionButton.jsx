export default function ActionButton() {
  return (
    <div className='dropdown-bottom dropdown'>
      <label tabIndex={0} className='btn-primary btn'>
        Action
      </label>
      <ul tabIndex={0} className='dropdown-content menu rounded-box z-[1] w-52 bg-black p-2 shadow'>
        {/* <li>
          <a>Edit</a>
        </li> */}
        <li>
          <a>Delete</a>
        </li>
      </ul>
    </div>
  );
}
