import React, { useState } from 'react';
import MsgInput from './MsgInput'
import MsgItem from './MsgItem'

const originalMsgs = Array(50).fill(0).map((_, i) => ({
  id: 50 - i,
  userId: '민주',
  timestamp: 1654564165 + (50 - i) * 1000 * 60,
  text: `${50 - i} mock text`,
}))

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsgs)
  const [editingId, setEditingId] = useState(null)

  const onCreate = text => {
    const newMsg = {
      id: msgs.length + 1,
      userId: '민주',
      timestamp: Date.now(),
      text: `${msgs.length} ${text}`
    }
    setMsgs(msgs => ([newMsg, ...msgs]))
  }

  const onUpdate = (text, id) => {
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id)
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text
      })
      return newMsgs
    })
    doneEdit()
  }

  const onDelete = id => {
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id)
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1)
      return newMsgs
    })
    doneEdit()
  }

  const doneEdit = () => setEditingId(null)

  return (
    <>
      {console.log(msgs)}
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {
          msgs.map((e, i) => {
            return <MsgItem
              key={e.id}
              {...e}
              onUpdate={onUpdate}
              onDelete={() => onDelete(e.id)}
              startEdit={() => setEditingId(e.id)}
              isEditing={editingId === e.id}
            />
          })
        }
      </ul>
    </>
  );
};

export default MsgList;