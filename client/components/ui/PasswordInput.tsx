import cn from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import {IoEyeOff, IoEye } from "react-icons/io5";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	inputClassName?: string;
	labelKey: string;
	name: string;
	shadow?: boolean;
	errorKey: string | undefined;
}
const classes = {
	root:
		"py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border border-gray-500 text-input text-xs lg:text-sm font-body rounded-md placeholder-gray-600  transition duration-200 ease-in-out bg-white border border-gray-100 focus:outline-none focus:border-heading h-11 md:h-12",
};
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className = "block",
			inputClassName,
			labelKey,
			name,
			errorKey,
			shadow = false,
			...rest
		},
		ref
	) => {
		const [show, setShow] = useState(false);

		const rootClassName = cn(classes.root, inputClassName);
		return (
			<div className={className}>
				{labelKey && (
					<label
						htmlFor={name}
						className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
					>
						{labelKey}
					</label>
				)}
				<div className="relative">
					<input
						id={name}
						name={name}
						type={show ? "text" : "password"}
						ref={ref}
						className={rootClassName}
						autoComplete="off"
						autoCapitalize="off"
						spellCheck="false"
						{...rest}
					/>
					<label
						htmlFor={name}
						className="absolute right-4 end-4 top-5 -mt-2 text-gray-500 cursor-pointer"
						onClick={() => setShow((prev) => !prev)}
					>
						{show ? (
							<IoEyeOff className="w-6 h-6" />
						) : (
							<IoEye className="w-6 h-6" />
						)}
					</label>
				</div>
				{errorKey && <p className="my-2 text-xs text-red-500">{errorKey}</p>}
			</div>
		);
	}
);

export default PasswordInput;
