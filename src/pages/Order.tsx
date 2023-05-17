import { useEffect, useState } from "react";

export default function Order() {
	const [order, setOrder] = useState<string>("");

	useEffect(() => {
		async function run() {
			const response = await fetch(
				"https://api.shipup.co/v2/orders?order_number=UK1876YH08_2",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: import.meta.env.VITE_API_KEY,
					},
				}
			);
			const data = await response.json();
			setOrder(JSON.stringify(data));
		}
		run();
	}, []);

	return <>{order}</>;
}
