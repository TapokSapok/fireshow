import { motion } from 'framer-motion';
import styles from './first-section.module.scss';
import { useEffect, useState } from 'react';
import firstBanner from '@/assets/banners/first-banner.png';
import secondBanner from '@/assets/banners/second-banner.png';
import logo from '@/assets/logo/logo-wout-text.png';
import arrowLeft from '@/assets/svg/arrow-left.svg';
import arrowRight from '@/assets/svg/arrow-right.svg';

const banners = [firstBanner, secondBanner];

export default function FirstSection() {
	const [bannerIndex, setBannerIndex] = useState(0);
	const [bannerTimeout, setBannerTimeout] = useState<any>(null);

	function switchBanner(isForward: boolean) {
		if (isForward) {
			if (bannerIndex >= banners.length - 1) setBannerIndex(0);
			else setBannerIndex(p => p + 1);
		} else {
			if (bannerIndex <= 0) setBannerIndex(banners.length - 1);
			else setBannerIndex(p => p - 1);
		}
	}

	useEffect(() => {
		if (bannerTimeout) clearTimeout(bannerTimeout);
		setBannerTimeout(
			setTimeout(() => {
				if (bannerIndex >= banners.length - 1) setBannerIndex(0);
				else setBannerIndex(p => p + 1);
			}, 10000)
		);
	}, [bannerIndex]);

	return (
		<section className={styles.section}>
			{/* <div className={styles.info_wrapper}>
				<h1 className={styles.title}>Ваш праздник достоин лучшего, и мы воплотим это в реальность.</h1>
				<div className={styles.logo}>
					<img src={logo} alt='' className={styles.logo_image} />
				</div>
			</div> */}

			<div className={styles.banner}>
				<div className={styles.info_wrapper}>
					<h1 className={styles.title}>Ваш праздник достоин лучшего, и мы воплотим это в реальность.</h1>
					<div className={styles.logo}>
						<img src={logo} alt='' className={styles.logo_image} />
					</div>
				</div>

				<div className={styles.arrows}>
					<div className={styles.arrow} onClick={() => switchBanner(false)}>
						<div className={styles.arrow}>
							<img className={styles.arrow_image} src={arrowLeft} data-side='left' />
						</div>
					</div>
					<div className={styles.arrow} onClick={() => switchBanner(true)}>
						<div className={styles.arrow}>
							<img className={styles.arrow_image} src={arrowRight} data-side='right' />
						</div>
					</div>
				</div>
				<div className={styles.circles}>
					{banners.map((_, i) => (
						<span className={styles.circle} data-current={i === bannerIndex} key={i} onClick={() => setBannerIndex(i)} />
					))}
				</div>
				<div className={styles.banner_wrapper}>
					{banners.map((banner, i) => (
						<motion.img
							key={i}
							src={banner}
							data-enabled={bannerIndex === i}
							className={styles.banner_image}
							initial={{ opacity: 0 }}
							animate={{ opacity: bannerIndex === i ? 1 : 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: '0.4' }}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
