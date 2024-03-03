import { ClientDTO } from "./clientDTO";

export interface ClientsPagedDTO {
    totalClients: number;
    clients:ClientDTO[];
}