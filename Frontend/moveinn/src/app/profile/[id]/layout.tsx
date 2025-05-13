import { Metadata } from 'next';

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Profile - MoveInn',
    };
}

export default function ProfileLayout({ children }: LayoutProps) {
    return <>{children}</>;
}