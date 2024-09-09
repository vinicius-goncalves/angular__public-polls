export default interface PollData {
    id: ReturnType<typeof crypto.randomUUID> | string;
    title: string;
    description: string;
    totalVotes: number;
    expiresAt: Date;
    createdAt: Date;
}
