import { Divider, Title } from "@mantine/core"
import { User } from "~/utils/types"

const UserView = ({
    user,
    children,
}: {
    user: User
    children?: React.ReactNode
}) => {
    return (
        <div className="flex gap-3 border-b border-slate-400 p-4" key={user.id}>
            <img
                src={user.imageUrl ?? ""}
                width={56}
                height={56}
                className="rounded-full"
                alt="user profile pic"
            />
            <div className="flex flex-col">
                <div className="flex gap-1">
                    <Title>{`${user.name} `}</Title>
                </div>
            </div>
            <div className="flex flex-col" style={{ marginLeft: "auto" }}>
                <div className="flex gap-1">{children}</div>
            </div>
        </div>
    )
}

export default UserView
