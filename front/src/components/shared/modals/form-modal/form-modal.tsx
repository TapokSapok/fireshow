import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { IShowCard } from '../../../../data/show-cards';
import styles from './form-modal.module.scss';
import InputField from '../../ui/input-field/Input-field';
import closeSvg from '@/assets/svg/close.svg';
import { api } from '../../../../api/api';
import toast from 'react-hot-toast';
import loadingSvg from '@/assets/svg/loading.svg';
import { useForm } from 'react-hook-form';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	showCard: IShowCard;
}

export default function FormModal({ isOpen, onClose, showCard }: IProps) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [patronymic, setPatronymic] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [choise, setChoise] = useState('phone');
	const [loading, setLoading] = useState(false);

	const modalRef = useRef<HTMLDivElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	function clearData() {
		setName('');
		setSurname('');
		setPatronymic('');
		setPhoneNumber('');
		setEmail('');
	}

	useEffect(() => {
		function handleKeyup(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose();
		}

		function handleMousedown(e: MouseEvent) {
			if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
				onClose();
			}
		}

		document.addEventListener('keyup', handleKeyup);
		document.addEventListener('mousedown', handleMousedown);

		return () => {
			document.removeEventListener('keyup', handleKeyup);
			document.removeEventListener('mousedown', handleMousedown);
		};
	}, [onClose]);

	useEffect(() => {
		if (isOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = '';
	}, [isOpen]);

	useEffect(() => {
		console.log(name);
	}, [name]);

	async function handleSubmitForm(data: any) {
		console.log(data);
		setLoading(true);
		const res = await api.sendFormRequest({ name, patronymic, surname, email, phoneNumber });
		setLoading(false);
		if (res.status) {
			clearData();
			onClose();
			console.log('success');
			toast.success('Заявка успешно отправлена!');
		} else {
			toast.error('Ошибка при отправке заявки!');
		}
	}

	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className={styles.modal}>
			<div className={styles.modal_block} ref={modalRef}>
				{loading && (
					<div className={styles.loading_block}>
						<img src={loadingSvg} />
					</div>
				)}
				<div className={styles.header}>
					<h1 className={styles.title}>{showCard.title}</h1>
					<button className={styles.close_button} onClick={() => onClose()}>
						<img src={closeSvg} className={styles.close_image} />
					</button>
				</div>
				<form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
					<div className={styles.inputs}>
						<InputField id='name' label='Имя' required={true} value={name} onChange={setName} register={register} errors={errors} />
						<InputField id='surname' label='Фамилия' required={false} value={surname} onChange={setSurname} register={register} errors={errors} />
						<InputField id='patronymic' label='Отчество' required={false} value={patronymic} onChange={setPatronymic} register={register} errors={errors} />
						{choise === 'phone' ? (
							<InputField
								id='phone'
								label='Номер телефона'
								required={true}
								value={phoneNumber}
								onChange={setPhoneNumber}
								register={register}
								errors={errors}
								pattern={{
									value: /^\+?[0-9]{10,14}$/,
									message: 'Неверный формат телефона',
								}}
							/>
						) : (
							<InputField
								id='email'
								label='Почта'
								required={true}
								value={email}
								onChange={setEmail}
								register={register}
								errors={errors}
								pattern={{
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Неверный формат почты',
								}}
							/>
						)}
						<div className={styles.choise} onClick={() => setChoise(choise === 'phone' ? 'email' : 'phone')}>
							Сменить на {choise === 'phone' ? 'почту' : 'номер телефона'}
						</div>
					</div>
					<button className={styles.send_button} type='submit'>
						Отправить
					</button>
				</form>
			</div>
		</div>,
		document.body
	);
}
