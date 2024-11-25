import {commonMetadata} from "@/common/shared-metadata";

export const metadata = {
    title: `Main page ${commonMetadata.title}`,
    description: "ths is main page",
}

export default function MainPage() {
    return (
        <div>
            <h1>Main Page</h1>
        </div>
    );
}
