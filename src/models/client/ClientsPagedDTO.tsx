import { ClientDTO } from "./clientDTO";

export interface ClientsPagedDTO {
    totalRecords: number
    count: number
    items: ClientDTO[]
    pageSize: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
