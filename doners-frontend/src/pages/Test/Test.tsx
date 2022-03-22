import Avatar from 'assets/theme/Avatar/Avatar';
import Button from 'assets/theme/Button/Button';
import Tag from 'assets/theme/Tag/Tag';
import React from 'react';
import src from 'assets/images/character.png'
import ImgButton from 'assets/theme/ImgButton/ImgButton';
import Input from 'assets/theme/Input/Input';

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
      
      <ImgButton src={src}/>
      <ImgButton src={src} shadow/>
      <ImgButton src={src} shadow active/>

      <Input />
      <Input error/>
    </div>

  );
};

export default Test;