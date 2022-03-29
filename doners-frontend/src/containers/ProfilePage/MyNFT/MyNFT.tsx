import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MyNFT.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import NFTCard from 'components/NFTCard/NFTCard';

const cx = classNames.bind(styles);
const MyNFT = () => {
  return (
    <div>
      <NFTCard />
      mynft!<div>mynft!</div>
      <div>mynft!</div>
      <div>mynft!</div>
      <div>mynft!</div>
    </div>
  );
};

export default MyNFT;
