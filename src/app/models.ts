export interface Contact {
    id: number;
    name: string;
    image: string;
    status: 'online' | 'offline';
    designation: string;
    bio: string;
    emails: string[];
    phones: string[];
    
    dial?: string;
    meeting?: string;
    socials?: string[];
}