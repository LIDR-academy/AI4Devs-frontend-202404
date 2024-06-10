export interface Candidate {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phase: string;
    averageScore: number;
}

export interface Position {
    id: number;
    title: string;
    manager: string;
    deadline: string;
    status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
}
