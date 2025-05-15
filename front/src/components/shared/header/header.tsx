import styles from './header.module.scss';
import instagramSvg from '@/assets/svg/instagram.svg';
import vkSvg from '@/assets/svg/vk.svg';
import upArrowSvg from '@/assets/svg/up-arrow.svg';

export default function Header() {
	function handleLogoClick() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<span className={styles.title} onClick={() => handleLogoClick()}>
					RESONANCE SHOW <img src={upArrowSvg} className={styles.arrow} />
				</span>
			</div>
			<div className={styles.links}>
				<a href='https://vk.com/resonance.show_vdk' target='_blank'>
					<span>Вконтакте</span> <img src={vkSvg} className={styles.link_image} />
				</a>
				<span className={styles.separator}></span>
				<a href='https://www.instagram.com/resonance.show?igsh=MWs3djRxNmx2eGg3NA==' target='_blank'>
					<span>Инстаграм</span> <img src={instagramSvg} className={styles.link_image} />
				</a>
			</div>
		</header>
	);
}
