import { useContext, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

const MyAccount = () => {
	const context = useContext(ShoppingCartContext);
	const [view, setView] = useState("user-info");
	const form = useRef(null);

	// account
	const account = localStorage.getItem("account");
	const parsedAccount = JSON.parse(account);

	// has account
	const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
	const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
	const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

	const editAccount = () => {
		const formData = new FormData(form.current);

		const data = {
			name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password"),
		};

		// create account
		const stringifiedAccount = JSON.stringify(data);
		localStorage.setItem("account", stringifiedAccount);
		context.setAccount(data);
		// signin
	};

	const renderUserInfo = () => {
		return (
			<div className='flex flex-col w-80'>
				<p>
					<span className='font-light text-sm'>Name: </span>
					<span>{parsedAccount?.name}</span>
				</p>
				<p>
					<span className='font-light text-sm'>Email: </span>
					<span>{parsedAccount?.email}</span>
				</p>
				<p>
					<span className='font-light text-sm'>Password: </span>
					<span>{parsedAccount?.password}</span>
				</p>
				<button
					className='bg-black dark:bg-slate-100 text-white dark:text-slate-800 disabled:opacity-40 w-full rounded-lg py-3 mt-4 mb-2'
					onClick={() => setView("edit-user-info")}>
					Edit info
				</button>
			</div>
		);
	};

	const renderEditUserInfo = () => {
		return (
			<form
				ref={form}
				className='flex flex-col gap-4 w-80'>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor='name'
						className='font-light-text-sm'>
						Your name:
					</label>
					<input
						type='text'
						id='name'
						name='name'
						defaultValue={parsedAccount?.name}
						placeholder='Leo'
						className='rounded-lg border border-black dark:border-slate-200 placeholder:font-light placeholder:text-sm placeholder:text-black/60 dark:placeholder:text-slate-200/60 py-2 px-4 bg-transparent'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor='email'
						className='font-light-text-sm'>
						Your email:
					</label>
					<input
						type='text'
						id='email'
						name='email'
						defaultValue={parsedAccount?.email}
						placeholder='hi@gmail.com'
						className='rounded-lg border border-black dark:border-slate-200 placeholder:font-light placeholder:text-sm placeholder:text-black/60 dark:placeholder:text-slate-200/60 py-2 px-4 bg-transparent'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor='password'
						className='font-light-text-sm'>
						Your password:
					</label>
					<input
						type='text'
						id='password'
						name='password'
						defaultValue={parsedAccount?.password}
						placeholder='**********'
						className='rounded-lg border border-black dark:border-slate-200 placeholder:font-light placeholder:text-sm placeholder:text-black/60 dark:placeholder:text-slate-200/60 py-2 px-4 bg-transparent'
					/>
				</div>
				<button
					className='bg-black dark:bg-slate-200 text-white dark:text-slate-800 w-full rounded-full py-3'
					onClick={() => editAccount()}>
					Save User Account
				</button>
			</form>
		);
	};

	const renderView = () => (view === "edit-user-info" ? renderEditUserInfo() : renderUserInfo());

	return (
		<>
			<h1 className='font-medium text-xl text-center mb-6 w-80'>My Account</h1>
			{renderView()}
		</>
	);
};

export default MyAccount;
