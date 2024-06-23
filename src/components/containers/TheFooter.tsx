import React from 'react';

const TheFooter = () => {
  return (
    <footer>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Phun sờ nách
        </a>
        <span className="ms-1">&copy; 2024 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
      </div>
    </footer>
  );
};

export default React.memo(TheFooter);
