import React, {FC} from 'react';

type ContactLayoutProps = {
    children: React.ReactNode;
}

const ContactLayout: FC<ContactLayoutProps> = ({children} )=> {
    // export default function ContactLayout ({children}): ContactLayoutProps => {
    return(
        <div>
            <hr/>
            Contact Layout
            <hr/>
            {children}
        </div>
    );
}

export default ContactLayout;
