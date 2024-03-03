import axios from "axios";
import { ClientDTO } from "../models/client/clientDTO";
import { ClientEditDTO } from "../models/client/clientEditDTO";
import { MessagingHelper } from "../models/helper/messagingHelper";
import { ClientNewDTO } from "../models/client/ClientNewDTO";
import { ClientsPagedDTO } from "../models/client/ClientsPagedDTO";


var apiBaseUrl = process.env.REACT_APP_API_URL;
export class ClientService {
    
    //async Create(dto: ClientNewDTO):Promise<MessagingHelper<ClientDTO|null>>  {
    async Create(dto: ClientNewDTO):Promise<MessagingHelper<null>>  {
        try {
            const result = await axios.post(`${apiBaseUrl}client`,
                {
                    ...dto
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                });

            return result.data;
        }
        catch (ex) {
            return new MessagingHelper<null>(false, "Ocorreu um erro inesperado ao criar o cliente", null)
        }
    }

    async GetAllByPage(page: number,pageSize:number, searchTerm: string): Promise<MessagingHelper<ClientsPagedDTO | null>> {
        console.log("🚀 ~ GetAllByPage ~ searchTerm:", searchTerm)
        try {
            let url = `${apiBaseUrl}client?pageNumber=${page}&pageSize=${pageSize}`;
            if(searchTerm)
            {
                url += `&searchTerm=${searchTerm}`;
            }
                console.log("🚀 ~ GetAllByPage ~ url:", url)

            const result = await axios.get(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            return result.data;
        }
        catch (ex) {
            return new MessagingHelper<null>(false, "Ocorreu um erro inesperado ao obter o cliente", null)
        }
    }

    async Get(id: number): Promise<MessagingHelper<ClientDTO | null>> {
        try {
            const result = await axios.get(`${apiBaseUrl}client/${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            return result.data;
        }
        catch (ex) {
            return new MessagingHelper<null>(false, "Ocorreu um erro inesperado ao obter o cliente", null)
        }
    }

    async Update(id: number, dto: ClientEditDTO): Promise<MessagingHelper<ClientDTO | null>> {
        try {
            const result = await axios.put(`${apiBaseUrl}client/${id}`,
                {
                    ...dto
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                });

            return result.data;
        }
        catch (ex) {
            return new MessagingHelper<null>(false, "Ocorreu um erro inesperado ao atualizar o cliente", null)
        }
    }

    async Enable(id: number): Promise<MessagingHelper<null>> {
        try {
            const result = await axios.post(`${apiBaseUrl}client/${id}/Enable`,
                {},
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                });

            return result.data;
        }
        catch (ex) {
            return new MessagingHelper<null>(false, "Ocorreu um erro inesperado ao ativar o cliente", null)
        }
    }

    async Disable(id: number): Promise<MessagingHelper<null>> {
        try {
            const result = await axios.post(`${apiBaseUrl}client/${id}/Disable`,
                {},
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                });

            return result.data;
        }
        catch (ex) {
            return new MessagingHelper<null>(false, "Ocorreu um erro inesperado ao desativar o cliente", null)
        }
    }
}