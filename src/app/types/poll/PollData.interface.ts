export default interface Poll {
    id: ReturnType<typeof crypto.randomUUID> | string;
    title: string;
    description: string;
    totalVotes: number;
    questions: Question[];
    createdAt: Date | string;
    expiresAt: Date | string;
}

export interface Question {
    id: ReturnType<typeof crypto.randomUUID> | string;
    question: string;
    votes: number;
}
