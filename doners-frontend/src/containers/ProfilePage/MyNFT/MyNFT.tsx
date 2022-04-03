import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './MyNFT.module.scss';
import NFTCard from 'components/NFTCard/NFTCard';
import EpilogueCard from 'components/EpilogueCard/EpilogueCard';
import { getUserNFTMetadataList, mint } from 'services/blockchain/NftApi';
import { getWalletAccount } from 'utils/walletAddress';

const cx = classNames.bind(styles);
const MyNFT = () => {
  const [nftList, setNftList] = useState([]);

  const getNftList = async () => {
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    const response = await getUserNFTMetadataList(await getWalletAccount());
    // console.log(response);
    setNftList(response);
  };

  useEffect(() => {
    getNftList();
  }, []);

  return (
    <div>
      <section className={cx('container')}>
        {/* <div className={cx('col-lg-12')}> */}
        <div className={cx('row')}>
          {nftList.length > 0
            ? nftList.map((item: string, idx) => (
                <div
                  key={idx}
                  className={cx('col-lg-3', 'col-md-3', 'col-sm-2')}
                >
                  <NFTCard metadataUri={item} />
                </div>
              ))
            : null}
          {/* </div> */}
          {/* <div className={cx('row')}>
          <div className={cx('col-lg-3')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg-3')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg-3')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg-3')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg-3')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg-3')}>
            <NFTCard />
          </div> */}
          {/* </div> */}
        </div>
      </section>
      {/* <NFTCard /> */}
    </div>
  );
};

export default MyNFT;
