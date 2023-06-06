import { useContext, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

const Signin = () => {
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

	const handleSignIn = () => {
		const stringifiedsignOut = JSON.stringify(false);
		localStorage.setItem("sign-out", stringifiedsignOut);
		context.setSignOut(false);
		// Redirect
		return (
			<Navigate
				replace
				to={"/"}
			/>
		);
	};

	const createAccount = () => {
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
		handleSignIn();
	};

	const renderLogin = () => {
		return (
			<div className='flex flex-col w-80'>
				<p>
					<span className='font-light text-sm'>Email: </span>
					<span>{parsedAccount?.email}</span>
				</p>
				<p>
					<span className='font-light text-sm'>Password: </span>
					<span>{parsedAccount?.password}</span>
				</p>
				<Link to='/'>
					<button
						className='bg-black dark:bg-slate-100 text-white dark:text-slate-800 disabled:opacity-40 w-full rounded-lg py-3 mt-4 mb-2'
						disabled={!hasUserAnAccount}
						onClick={() => handleSignIn()}>
						Log in
					</button>
				</Link>
				<div className='text-center'>
					<a
						href='/'
						className='font-light text-xs underline underline-offset-4'>
						Forgot my password
					</a>
				</div>
				<button
					className='border border-black dark:border-slate-100 disabled:opacity-40 w-full rounded-lg py-3 mt-4 mb-2'
					disabled={hasUserAnAccount}
					onClick={() => setView("create-user-info")}>
					Sign up
				</button>
			</div>
		);
	};

	const renderCreateUserInfo = () => {
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
				<Link to='/'>
					<button
						className='bg-black dark:bg-slate-200 text-white dark:text-slate-800 w-full rounded-full py-3'
						onClick={() => createAccount()}>
						Create
					</button>
				</Link>
			</form>
		);
	};

	const renderView = () => (view === "create-user-info" ? renderCreateUserInfo() : renderLogin());

	return (
		<>
			<h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome</h1>
			{renderView()}
		</>
	);
};

export default Signin;
