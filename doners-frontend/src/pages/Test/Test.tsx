import Avatar from 'assets/theme/Avatar/Avatar';
import Button from 'assets/theme/Button/Button';
import Tag from 'assets/theme/Tag/Tag';
import React from 'react';
import src from 'assets/images/character.png'

const Test = () => {
  return (
    <div className="container">
      <Button color="primary">버튼</Button>
      <Button color="secondary">버튼</Button>
      <Button color="alternate">버튼</Button>
      
      <Button color="primary" shadow>버튼</Button>
      <Button color="secondary" shadow>버튼</Button>
      <Button color="alternate" shadow>버튼</Button>

      <Button color="primary" size='small'>버튼</Button>
      <Button color="secondary" size='small'>버튼</Button>
      <Button color="alternate" size='small'>버튼</Button>
      
      <Button color="primary" size='small' fullWidth>버튼</Button>
      <Button color="secondary" size='small' fullWidth>버튼</Button>
      <Button color="alternate" size='small' fullWidth>버튼</Button>
      

      <Tag color='red'>태그</Tag>
      <Tag color='yellow'>태그</Tag>
      <Tag color='green'>태그</Tag>
      <Tag color='black'>태그</Tag>
      <Tag color='orange'>태그</Tag>
      
      <Avatar src={src}/>
      <Avatar size="small" src={src}/>
      
      {/* <div>
        <strong className="tag-red">red</strong>
        <strong className="tag-yellow">yellow</strong>
        <strong className="tag-orange">orange</strong>
        <strong className="tag-green">green</strong>
        <div className="tag-black">black</div>
      </div>
      <div>
        <div className="avatar-32">
        </div>
        <div className="avatar-24">
        </div>
  </div>*/}
    </div>

  );
};

export default Test;