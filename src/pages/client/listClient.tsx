import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClientDTO } from "../../models/client/clientDTO";
import { ClientService } from "../../services/clientService";
import { ClientsPagedDTO } from "../../models/client/ClientsPagedDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";

export default function ListClient() {
    const [clients, setClients] = useState<ClientDTO[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>();
    

    const clientService = new ClientService();
    const pageSize = 5;
    const getClientsByPage = async (pageNumber: number) => {
        try {
            const resultGetClients: MessagingHelper<ClientsPagedDTO | null> = await clientService.GetAllByPage(pageNumber, pageSize);

            if (resultGetClients.success) {
                setClients(resultGetClients.obj?.clients || null);
                const totalClients = resultGetClients.obj?.totalClients || 0;
                setTotalPages(Math.ceil(totalClients / pageSize));
            } else {
                setErrorMessage(resultGetClients.message);
    
            }

        } catch (error) {
            setErrorMessage("Error fetching clients");
        }
    };

    useEffect(() => {
        getClientsByPage(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">

            <div className="row">
                <div className="col-10">
                    <h5 className="fw-bold mb-3">Clients</h5>
                </div>
                <div className="col-2 d-flex justify-content-end mb-2">
                    <Link to="/client/new" className="btn btn-primary">New Client</Link>
                </div>
                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Client Id</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients?.map((client) => (
                                <tr key={client.id}>
                                    <td>
                                        <Link to={`/client/edit/${client.id}`}>
                                            {client.id}
                                        </Link>
                                    </td>
                                    <td>{client.name}</td>
                                    <td>{client.phoneNumber}</td>
                                    <td>{client.isActive ? 'Active' : 'Inactive'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="col-12 d-flex justify-content-end mb-12">
                        <nav>
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous" disabled={currentPage === 1}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next" disabled={currentPage === totalPages}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="row">
                {errorMessage &&
                    <div className="col-10">
                        <h5 className="fw-bold mb-3">{errorMessage}</h5>
                    </div>
                }

            </div>
        </div>

    );
}
