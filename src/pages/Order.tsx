import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

type Order = {
	id?: number | null;
	firstname?: string;
	lastname?: string;
	trackers?: string[];
};

export default function Order() {
	const [order, setOrder] = useState<Order>({});

	useEffect(() => {
		async function run() {
			const response = await fetch(
				"https://api.shipup.co/v2/orders?expand[]=fulfillments.trackers.line_items&order_number=UK1876YH08_2",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: import.meta.env.VITE_API_KEY,
					},
				}
			);

			const {
				data: [
					{
						id = null,
						first_name: firstname = "",
						last_name: lastname = "",
						fulfillments = {},
					} = {},
				] = [],
			} = (await response.json()) || {};
			const trackers = fulfillments?.data?.[0]?.trackers?.data || [];
			setOrder({
				id,
				firstname,
				lastname,
				trackers: trackers.map(
					({ tracking_number: tracking }: { tracking_number: number }) =>
						tracking
				),
			});
		}
		run();
	}, []);

	return (
		<ul>
			<li>{order.id}</li>
			<li>{order.firstname}</li>
			<li>{order.lastname}</li>
			<li>
				{order.trackers?.map((item) => (
					<NavLink key={item} to={`/tracker/${item}`}>
						{item}
					</NavLink>
				))}
			</li>
		</ul>
	);
}
