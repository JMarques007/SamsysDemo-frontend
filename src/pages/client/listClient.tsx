import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ClientDTO } from "../../models/client/clientDTO";
import { ClientEditDTO } from "../../models/client/clientEditDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import ClientStatusComponent from "../../components/client/statusComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export default function ListClient() {
    const { id } = useParams<{ id: string; }>();
    const [clientToUpdate, setClientToUpdate] = useState<ClientEditDTO>();
    const [clients, setClients] = useState<null|ClientDTO[]>(null);
    //const [isActive, setIsActive] = useState<boolean>(true);

    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();

    const clientService = new ClientService();

    const get = async () => {

        const resultGetClients: MessagingHelper<ClientDTO[] |null> = await clientService.GetAllByPage(1);
    
        if (!resultGetClients.success) {
            setErrorMessage(resultGetClients.message);
            setSuccessMessage("");
            return;
        }
        setClients(resultGetClients.obj); // Update state with the list of clients
        console.log("🚀 ~ get ~ resultGetClients.obj:", resultGetClients.obj)
        setErrorMessage("");
    }
        
    
    useEffect(() => {
        get();
    }, [])

    // return (
    //     <div>
    //         <table className="table">
    //             <thead>
    //                 <tr>
    //                     <th>Id</th>
    //                     <th>Name</th>
    //                     <th>Phone Number</th>
    //                     <th>Active</th>
                        
    //                     {/* Add more table headers for other client properties if needed */}
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {clients?.map((client) => (
    //                     <tr key={client.id}>
    //                         <td>{client.id}</td>
    //                         <td>{client.name}</td>
    //                         <td>{client.phoneNumber}</td>
    //                         <td>{client.isActive}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );

 /*   return (
        <div>
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
                        
                            <tr>
                                <td>
                                <Link key={client.id} to={`/client/edit/${client.id}`}>
                                {client.id}
                                </Link></td>
                                <td>{client.name}</td>
                                <td>{client.phoneNumber}</td>
                                <td>{client.isActive ? 'Active' : 'Inactive'}</td>
                            </tr>
                       
                    ))}
                </tbody>
            </table>
        </div>
    );*/
    return (
        <div>
            <Row>
                <Col xl={12}>
                    <Link to="/client/new" className="btn btn-primary">Create New Client</Link>
                </Col>
            </Row>
            <table className="table">
                <thead>
                    <tr>
                        <th>Client Id</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Active</th>
                        {/* Add more table headers for other client properties if needed */}
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
        </div>
    );
    
}