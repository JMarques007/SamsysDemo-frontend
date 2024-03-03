import React, { useEffect, useState } from "react";
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
    const [searchTerm, setSearchTerm] = useState<string>("");

    const clientService = new ClientService();
    const pageSize = 5;

    const getClientsByPage = async (pageNumber: number, searchTerm: string) => {
        setErrorMessage("");

        try {
            const resultGetClients: MessagingHelper<ClientsPagedDTO | null> = await clientService.GetAllByPage(pageNumber, pageSize, searchTerm);
            if (resultGetClients.success) {
                setClients(resultGetClients.obj?.clients || null);
                console.log("🚀 ~ getClientsByPage ~ resultGetClients.obj?.clients:", resultGetClients.obj?.clients)
                const totalClients = resultGetClients.obj?.totalClients || 0;
                setTotalPages(Math.ceil(totalClients / pageSize));
            } else {
                setErrorMessage(resultGetClients.message);
                setClients(null);
            }
                


        } catch (error) {
            setErrorMessage("Error fetching clients");
        }
    };

    useEffect(() => {
        getClientsByPage(currentPage, searchTerm);
    }, [currentPage]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5 className="fw-bold mb-3">Clients</h5>
                </div>

                <div className="col-10" >
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-2">
                    <button className="btn btn-primary" style={{ marginRight: '2px' }} onClick={() => getClientsByPage(currentPage, searchTerm)}>Find</button>
                    <Link to="/client/new" className="btn btn-primary">New</Link>
                </div>

                <div className="col-12" style={{ paddingTop: '1rem' }}>
                    <table className="table">
                        <thead>
                            <tr className="header-row">
                                <th>Client Id</th>
                                <th className="text-left col-name">Name</th>
                                <th className="text-right col-contact">Phone Number</th>
                                <th >Birthday</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients?.map((client, index) => (
                                <tr key={client.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>
                                        <Link to={`/client/edit/${client.id}`}>
                                            {client.id}
                                        </Link>
                                    </td>
                                    <td className="text-left col-name">{client.name}</td>
                                    <td className="text-right col-contact">{client.phoneNumber}</td>
                                    <td>{client.birthday ? client.birthday.split('T')[0] : ""}</td>
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
