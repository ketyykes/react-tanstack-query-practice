// 通知 UI 組件
interface NotificationProps {
	notifications: Notification[];
	removeNotification: (id: string) => void;
}

interface Notification {
	id: string;
	type: "success" | "error";
	message: string;
}

const Notifications = ({
	notifications,
	removeNotification,
}: NotificationProps) => {
	const getNotificationStateClass = (type: "success" | "error") => {
		switch (type) {
			case "success":
				return "bg-green-500";
			case "error":
				return "bg-red-500";
			default:
				return "";
		}
	};

	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			{notifications.map((notification) => (
				<div
					key={notification.id}
					className={`
						px-4 py-3 rounded-lg shadow-lg max-w-sm
						transform transition-all duration-300 ease-in-out cursor-pointer hover:opacity-80 text-white ${getNotificationStateClass(
							notification.type
						)}
					`}
					onClick={() => removeNotification(notification.id)}
				>
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">{notification.message}</span>
						<button
							onClick={(e) => {
								e.stopPropagation();
								removeNotification(notification.id);
							}}
							className="ml-2 text-white hover:text-gray-200"
						>
							✕
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Notifications;
