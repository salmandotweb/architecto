import { useSession } from "@clerk/clerk-react";

export const useGetUser = () => {
    const session = useSession();

    return session.session?.user
}