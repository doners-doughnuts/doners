import classNames from 'classnames/bind';
import styles from './NFTCard.module.scss';
import Tag from 'assets/theme/Tag/Tag';
import { useEffect, useState } from 'react';
import { getMetadataFromUri } from 'services/blockchain/NftApi';
import { NftMetadataType } from 'types/NftTypes';
import { fDate } from 'utils/formatTime';
import NFTDetail from 'containers/ProfilePage/NFTDetail/NFTDetail';

const cx = classNames.bind(styles);

const NftEdition: Record<string, string> = {
  covid: '코로나19',
  single: '미혼모',
  warrior: '참전용사',
  patient: '희귀병환자',
};

const NFTCard = ({ metadataUri }: any) => {
  const [metadata, setMetadata] = useState<NftMetadataType>();
  const [edition, setEdition] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getMetadata = async () => {
    let response: NftMetadataType = await getMetadataFromUri(metadataUri);
    setEdition(NftEdition[response.edition]);

    // @ts-ignore
    setMetadata(response);
  };

  // 여기에 업데이트 해야함 기존에는 useEffect -> metadataUri가 바뀌었을 때 다시 getMetadata 호출해주어야 바뀐것이 반영됨.
  useEffect(() => {
    getMetadata();
  }, [metadataUri]);

  return (
    <>
      <div className={cx('container')} onClick={handleOpenModal}>
        {metadata ? (
          <>
            <div className={cx('card')}>
              <div className={cx('tag')}>
                <Tag color="black">{edition}</Tag>
              </div>
              <div className={cx('img-wrap')}>
                <img src={metadata.image} alt="" />
              </div>
            </div>
            <div className={cx('detail')}>
              <div
                className={cx('nfttitle')}
              >{`${metadata.edition}#${metadata.tokenId}`}</div>
              <div className={cx('nftdate')}>
                {fDate(new Date(metadata.date).toLocaleDateString())}
              </div>
            </div>
          </>
        ) : null}
      </div>
      {modalOpen ? (
        <NFTDetail
          open={modalOpen}
          close={handleCloseModal}
          metadata={metadata}
        ></NFTDetail>
      ) : null}
    </>
  );
};

export default NFTCard;
