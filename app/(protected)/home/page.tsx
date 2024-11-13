import {auth} from "@/lib/auth"
import {Button} from "@/components/ui/button";
import {logout} from "@/app/actions";

export default async function Page() {

    const session = await auth();

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            {JSON.stringify(session)}
            <Button variant={'link'} onClick={logout}>Sign out</Button>
        </div>
    );
}