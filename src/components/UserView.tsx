import { Title } from "@mantine/core"
import { User } from "@prisma/client"
import Image from "next/image"

const UserView = ({
    user,
    children,
}: {
    user: User
    children?: React.ReactNode
}) => {
    return (
        <div className="flex gap-3 border-b border-slate-400 p-4" key={user.id}>
            <Image
                src={user.imageUrl ?? ""}
                width={56}
                height={56}
                className="rounded-full"
                alt="user profile picture"
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
