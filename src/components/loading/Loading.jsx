import React from 'react';
import '../../styles/loading.css';

const Loading = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='lds-css ng-scope'>
        <div className='lds-blocks' style={{ width: '100%', height: '100%' }}>
          <div style={{ left: '8px', top: '8px', animationDelay: '0s' }} />
          <div
            style={{ left: '70px', top: '8px', animationDelay: '0.1125s' }}
          />
          <div
            style={{ left: '132px', top: '8px', animationDelay: '0.225s' }}
          />
          <div
            style={{ left: '8px', top: '70px', animationDelay: '0.7875s' }}
          />
          <div
            style={{ left: '132px', top: '70px', animationDelay: '0.3375s' }}
          />
          <div
            style={{ left: '8px', top: '132px', animationDelay: '0.675s' }}
          />
          <div
            style={{ left: '70px', top: '132px', animationDelay: '0.5625s' }}
          />
          <div
            style={{ left: '132px', top: '132px', animationDelay: '0.45s' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
