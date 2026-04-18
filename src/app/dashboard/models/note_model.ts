export interface NoteRequestType {
    heading: string;
    note: string;
}
export interface NoteType{
    id: string;
    heading: string;
    content: string;
    createdAt: Date;
}
export interface NoteResponseType {
    message: string;
    note: NoteType;
}
export interface NotesResponseType {
    notes: NoteType[];
}
