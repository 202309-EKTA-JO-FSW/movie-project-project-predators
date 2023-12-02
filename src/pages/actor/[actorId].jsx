import React from 'react';
import { useRouter } from 'next/router';

const Actor = () => {
  const router = useRouter();
  const { actorId } = router.query;

  return (
    <div>
      <h1>Actor Details</h1>
      <p>Actor ID: {actorId}</p>
    </div>
  );
};

export default Actor;