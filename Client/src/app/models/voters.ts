import { Parties } from './parties';

export class Voters{
    public constructor(public id?: number,
        public firstName?: string,
        public lastName?: string,
        public socialNumber?: string,
        public gender?: string,
        public email?: string,
        public phone?: string,
        public socialNumberIssueDate?: Date,
        public city?: string,
        public votedTo?: Parties){}
}