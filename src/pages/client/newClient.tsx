import { useState } from "react";
import { Col, Row } from "reactstrap";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import { useNavigate } from "react-router-dom";
import { ClientNewDTO } from "../../models/client/ClientNewDTO";

export default function NewClient() {
    const [newClient, setNewClient] = useState<ClientNewDTO | undefined>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();

    const clientService = new ClientService();
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/client/list`;
        navigate(path);
    }

    const create = async () => {
        if (newClient) { 
            var resultCreate: MessagingHelper<null> = await clientService.Create(newClient);
            if (resultCreate.success == false) {
                setErrorMessage(resultCreate.message);
                setSuccessMessage("");
                return;
            }
            setSuccessMessage("Cliente criado com sucesso");
            setErrorMessage("");
        } else {
            console.error('New client data is undefined');
        }
    }

    return (
        <>
            <div style={{ width: "100%" }}>
                <Row>
                    <Col xl={12}>
                        <h1>Criar Cliente</h1>
                    </Col>
                </Row>
            </div>

            <div style={{ width: "20%", marginTop: "2em", display: "inline-block" }}>
                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Nome: </label>
                    </Col>
                    <Col xl={6}>
                        <input type="text"
                            value={newClient?.name ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewClient({ ...newClient, name: e.target.value })} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Contacto: </label>
                    </Col>
                    <Col xl={6}>
                        <input type="text"
                            value={newClient?.phoneNumber ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewClient({ ...newClient, phoneNumber: e.target.value })} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={4}>
                        <button className="btnBackList" onClick={routeChange}>
                            {'<-Back'}
                        </button>
                    </Col>
                    <Col xl={8}>
                        <button className="btnCreateClient" onClick={create}>
                            Create
                        </button>
                    </Col>
                </Row>

                {errorMessage &&
                    <Row>
                        <Col xl={12} className="error">
                            {errorMessage}
                        </Col>
                    </Row>
                }

                {successMessage &&
                    <Row>
                        <Col xl={12} className="success">
                            {successMessage}
                        </Col>
                    </Row>
                }
            </div>
        </>
    )
}
