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
    category: string;
    createdAt: Date;
    updateAt: Date;
}
export interface NoteResponseType {
    message: string;
    note: NoteType;
}
export interface NotesResponseType {
    notes: NoteType[];
}
