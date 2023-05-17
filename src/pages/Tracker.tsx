import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

export default function Tracker() {
	const [notifications, setNotifications] = useState<number[]>();
	const { tracking_number: tracking } = useParams<{
		tracking_number: string;
	}>();

	useEffect(() => {
		async function run() {
			const response = await fetch(
				`https://api.shipup.co/v2/trackers?tracking_number=${tracking}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: import.meta.env.VITE_API_KEY,
					},
				}
			);
			const { data } = (await response.json()) || {};
			const notifications = data?.[0]?.notifications?.data || [];

			// Do not find creation_date in notifications
			console.log(notifications);
			setNotifications(notifications.map(({ id }: { id: number }) => id));
		}
		run();
	}, [tracking]);

	return (
		<>
			{notifications?.join(" | ")}
			<br />
			<NavLink to="/">Back to home</NavLink>
		</>
	);
}
