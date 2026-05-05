export interface NoteRequestType {
    title: string;
    content: string;
    category: string;
}
export interface NoteType{
    id: string;
    title: string;
    content: string;
    icon: string;
    pinned: boolean;
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
export interface pinNoteResponseType {
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
export interface categoryResponseType {
    message: string;
    categories: categoryType[];
}