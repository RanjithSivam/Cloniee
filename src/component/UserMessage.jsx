import React, { forwardRef } from 'react';

let UserMessage = forwardRef((props, ref) => {
  let isUser = props.cur_user === props.val.user;
  return (
    <main className={isUser ? 'msg right-msg' : 'msg left-msg'} ref={ref}>
      <div
        class="msg-img"
        style={{
          backgroundImage:
            'url(https://image.flaticon.com/icons/svg/145/145867.svg)',
        }}
      ></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">{props.val.user}</div>
          <div class="msg-info-time">{props.val.time}</div>
        </div>

        <div class="msg-text">{props.val.text}</div>
      </div>
    </main>
  );
});

export default UserMessage;
