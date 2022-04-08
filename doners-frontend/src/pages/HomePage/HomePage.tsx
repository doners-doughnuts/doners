import AboutOurTeam from 'containers/HomePage/AboutOurTeam/AboutOurTeam';
import DonateSSF from 'containers/HomePage/DonateSSF/DonateSSF';
import IntroductionApply from 'containers/HomePage/IntroductionDoners/Apply/IntroductionApply';
import IntroductionCommunity from 'containers/HomePage/IntroductionDoners/Community/IntroductionCommunity';
import IntroductionDonate from 'containers/HomePage/IntroductionDoners/Donate/IntroductionDonate';
import IntroductionNFT from 'containers/HomePage/IntroductionNFT/IntroductionNFT';
import JoinCommunity from 'containers/HomePage/JoinCommunity/JoinCommunity';
import LandingHero from 'containers/HomePage/LandingHero/LandingHero';
import NFTWorks from 'containers/HomePage/NFTWorks/NFTWorks';

const HomePage = () => {
  return (
    <>
      <LandingHero />
      <IntroductionApply />
      <IntroductionDonate />
      <IntroductionCommunity />
      <DonateSSF />
      <NFTWorks />
      {/* <JoinCommunity /> */}
      <AboutOurTeam />
    </>
  );

  /*<section className={`${styles.Services} ${styles.section}`}>
        <div
          className={`${styles.container} ${styles['container-default']} ${styles['right-sort']}`}
        >
          <div className={styles.innerContainer}>
            <h1 className={styles.title}>서비스 장점 2</h1>
            <div className={styles.service}>
              <span>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.Services} ${styles.section}`}>
        <div className={`${styles.container} ${styles['container-default']}`}>
          <div className={styles.innerContainer}>
            <h1 className={styles.title}>서비스 장점 3</h1>
            <div className={styles.service}>
              <span>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est.
              </span>
            </div>
          </div>
        </div>
      </section>
      </section> */
};

export default HomePage;
