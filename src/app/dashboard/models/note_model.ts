
export interface NoteRequestType {
    title: string;
    content: string;
    pinned: boolean;
    favourite: boolean;
    category: string;
}
export interface NoteType{
    id: string;
    title: string;
    content: string;
    icon: string;
    pinned: boolean;
    favourite: boolean;
    trash: boolean;
    category: string;
    createdAt: string;
    updatedAt: string;
}
export interface NoteResponseType {
    message: string;
    note: NoteType;
}
export interface NotesResponseType {
    notes: NoteType[];
}
export interface pinNoteType {
    noteId: number;
    pinned: boolean;
}
export interface addFavType {
    noteId: number;
    favourite: boolean;
}
export interface pinNoteResponseType {
    message: string;
}
export interface addFavResponseType {
    message: string;
}
export interface EmptyStateMessageType {
    heading: string;
    text: string;
}
export interface categoryType {
    icon: string;
    category: string;
    noteCount: number;
}
export interface categType {
    id: number;
    name: string;
    icon: string;
    createdAt: Date;
}
export interface categResponseType {
    message: string;
    categories: categType[];
}
export interface categoryResponseType {
    message: string;
    categories: categoryType[];
}
export interface ActivityBigType{
    date: string;
    events: ActivityType[];
}
export interface ActivityType{
    timestamp: string;
    icon: string;
    action: string;
    textBody: string;
}
export interface ActivityResponseType{
    message: string;
    activities: ActivityType[];
}