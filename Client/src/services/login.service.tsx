import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext, User } from "../context/auth-context";



interface LoginRes extends Pick<User, "_id" | "fullName" | "username" | "profilePic"> {}

const useLogin = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username: string, password: string) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data:LoginRes = await res.json();
			if ((data as any).error) {
				throw new Error((data as any).error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username:string, password:string):boolean {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}