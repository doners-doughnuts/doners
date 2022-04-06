import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './MyNFT.module.scss';
import NFTCard from 'components/NFTCard/NFTCard';
import EpilogueCard from 'components/EpilogueCard/EpilogueCard';
import { getUserNFTMetadataList, mint } from 'services/blockchain/NftApi';
import { getWalletAccount } from 'utils/walletAddress';
import NFTDetail from '../NFTDetail/NFTDetail';

const cx = classNames.bind(styles);

type MyNFTType = {
  walletAddress: string;
};

const MyNFT = ({ walletAddress }: MyNFTType) => {
  const navigate = useNavigate();
  const [nftList, setNftList] = useState([]);

  const getNftList = async () => {
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // const result = await getWalletAccount();
    // console.log(result);
    const response = await getUserNFTMetadataList(walletAddress);
    // console.log(response);
    setNftList(response);
  };

  const handlePageMove = () => {
    navigate('/category');
  };

  useEffect(() => {
    // setNftList([]);
    getNftList();
  }, [walletAddress]);

  return (
    <div>
      <section className={cx('container')}>
        <div className={cx('row')}>
          {nftList ? (
            nftList.map((item: string, idx) => {
              console.log(item, idx);
              return (
                <div
                  key={idx}
                  className={cx('col-lg-2.5', 'col-md-3', 'col-sm-2')}
                  // onClick={() => openModal()}
                >
                  <NFTCard metadataUri={item} />
                </div>
              );
            })
          ) : (
            <div>
              <div className={cx('col-lg-3', 'col-md-3', 'col-sm-2')}>
                <div className={cx('empty')} onClick={handlePageMove}>
                  <div className={cx('card')}>기부하러 가기</div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <button onClick={openModal}>상세보기 테스트용</button> */}
      </section>
    </div>
  );
};

export default MyNFT;
