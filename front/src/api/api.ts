import axios from 'axios';
import { IFormData } from '../types';

export const api = {
	async sendFormRequest(formData: IFormData) {
		try {
			const res = await axios.post(`${import.meta.env.VITE_PUBLIC_BACK_URL}/api/form-request`, formData);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	},
};
