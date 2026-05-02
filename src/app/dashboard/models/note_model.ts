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
    category: string;
    createdAt: Date;
    updatedAt: Date;
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