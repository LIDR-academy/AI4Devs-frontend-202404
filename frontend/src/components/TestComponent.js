import React, { useState } from 'react';

const TestComponent = () => {
  const [test] = useState(null);
  return <div>{test}</div>;
};

export default TestComponent;