import Avatar from 'assets/theme/Avatar/Avatar';
import Button from 'assets/theme/Button/Button';
import Tag from 'assets/theme/Tag/Tag';
import React from 'react';
import src from 'assets/images/character.png';
import Input from 'assets/theme/Input/Input';
import RoundedButton from 'assets/theme/Button/RoundedButton/RoundedButton';
import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import editIcon from 'assets/images/icon/edit.svg';

const Test = () => {
  return (
    <div className="container">
      <Button color="primary">버튼</Button>
      <Button color="secondary">버튼</Button>
      <Button color="alternate">버튼</Button>

      <Button color="primary" shadow>
        버튼
      </Button>
      <Button color="secondary" shadow>
        버튼
      </Button>
      <Button color="alternate" shadow>
        버튼
      </Button>

      <Button color="primary" size="small">
        버튼
      </Button>
      <Button color="secondary" size="small">
        버튼
      </Button>
      <Button color="alternate" size="small">
        버튼
      </Button>

      <Button color="primary" size="small" fullWidth>
        버튼
      </Button>
      <Button color="secondary" size="small" fullWidth>
        버튼
      </Button>
      <Button color="alternate" size="small" fullWidth>
        버튼
      </Button>

      <Tag color="red">태그</Tag>
      <Tag color="yellow">태그</Tag>
      <Tag color="green">태그</Tag>
      <Tag color="black">태그</Tag>
      <Tag color="orange">태그</Tag>

      <Avatar src={src} />
      <Avatar size="small" src={src} />

      <RoundedButton src={src} />
      <RoundedButton src={src} shadow />
      <RoundedButton src={src} shadow active />

      <CustomButton src={editIcon} shadow />
      <CustomButton src={editIcon} color="yellow" shadow />
      <CustomButton src={editIcon} shadow>
        edit
      </CustomButton>

      <Input />
      <Input error />
    </div>
  );
};

export default Test;
