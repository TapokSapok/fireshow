import styles from './show-card.module.scss';
import arrowLeft from '@/assets/svg/arrow-left.svg';
import arrowRight from '@/assets/svg/arrow-right.svg';
import { IShowCard, showCards } from '../../../../../data/show-cards';

interface IProps {
	card: IShowCard;
	setShowIndex: (index: number) => void;
	showIndex: number;
	openFormModal: () => void;
}

const priceFormat = new Intl.NumberFormat('en-US');

export default function ShowCard({ card, setShowIndex, showIndex, openFormModal }: IProps) {
	function switchShow(isForward: boolean) {
		if (isForward && showCards[showIndex + 1]) setShowIndex(showIndex + 1);
		else if (!isForward && showIndex > 0) setShowIndex(showIndex - 1);
	}

	return (
		<div className={styles.card}>
			<div className={styles.left}>
				<div className={styles.arrow_side}>
					{showIndex > 0 && (
						<div className={styles.arrow} onClick={() => switchShow(false)}>
							<img className={styles.arrow_image} src={arrowLeft} data-side='left' />
						</div>
					)}
				</div>
				<div className={styles.menu}>
					<div className={styles.title} key={card.title}>
						{card.title}
					</div>
					<div className={styles.description} key={showIndex}>
						{card.description}
					</div>
					<div className={styles.price_form_block}>
						<div className={styles.price}>
							<span>Цена: </span>
							<span className={styles.price_number} key={showIndex}>
								{priceFormat.format(card.price)} ₽
							</span>
						</div>
						<button className={styles.form_button} onClick={() => openFormModal()}>
							Оставить заявку
						</button>
					</div>
				</div>
				<div className={styles.arrow_side}>
					{showCards[showIndex + 1] && (
						<div className={styles.arrow} onClick={() => switchShow(true)}>
							<img className={styles.arrow_image} src={arrowRight} data-side='right' />
						</div>
					)}
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.video} key={showIndex}>
					{/* <iframe src={card.videoUrl} frameBorder='0' allow='clipboard-write; autoplay' allowFullScreen></iframe> */}
				</div>
			</div>
		</div>
	);
}
