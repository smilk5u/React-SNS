import React from 'react';
import MasItem from './MagItem'

const UserIds = ['민주', '바보'];
// const getRandomUserID = () => UserIds[Math.round(Math.random())];
const getRandomUserID = () => { return '민주' };

const mags = Array(50).fill(0).map((_, i) => ({
  id: 50 - i,
  userId: getRandomUserID(),
  timestamp: 1654564165 + (50 - i) * 1000 * 60,
  text: `${50 - i} mock text`,
}))

const MagList = () => {
  return (
    <ul className="messages">
      {
        mags.map((e, i) => {
          return <MasItem key={e.id} {...e} />
        })
      }
    </ul>
  );
};

export default MagList;