import styles from './input-field.module.scss';

interface IProps {
	name?: string;
	id: string;
	type?: 'text' | 'password';
	value: string;
	onChange: (value: string) => void;
	label: string;
	required: boolean;
	placeholder?: string;

	register: any;
	pattern?: { value: RegExp; message: string };
	errors?: any;
}

export default function InputField({ value, onChange, placeholder, id, label, required, type = 'text', register, pattern, errors }: IProps) {
	return (
		<div className={styles.field}>
			<label htmlFor={id} data-required={required}>
				{label}
			</label>
			<input
				type={type}
				id={id}
				value={value}
				placeholder={placeholder}
				{...register(id, { required, pattern })}
				onChange={e => {
					onChange(e.target.value);
				}}
			/>
			{errors?.[id] && <div className={styles.error}>{errors?.[id].message}</div>}
		</div>
	);
}
