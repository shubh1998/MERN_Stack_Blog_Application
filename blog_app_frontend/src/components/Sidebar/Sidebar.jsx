const Sidebar = ({ sideBarOptions, handleRedirection, routePath }) => {
  return (
    <div className='sidebar'>
      <div className='sidebar__element'>
        <h3>Setting</h3>
      </div>
      {
        sideBarOptions.map(item => (
          <div className={routePath===item.url ? 'sidebar__active_element' : 'sidebar__element'} key={item.url} onClick={() => handleRedirection(item.url)}>
            <span>{item.label}</span>
          </div>
        ))
      }
    </div>
  );
};
export default Sidebar;
