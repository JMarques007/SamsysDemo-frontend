import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ClientDTO } from "../../models/client/clientDTO";
import { ClientEditDTO } from "../../models/client/clientEditDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import ClientStatusComponent from "../../components/client/statusComponent";
import { useNavigate } from "react-router-dom";

export default function EditClient() {
  const { id } = useParams<{ id: string }>();
  const [clientToUpdate, setClientToUpdate] = useState<ClientEditDTO>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const clientService = new ClientService();
  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/client/list`;
    navigate(path);
  };

  const get = async () => {
    var resultGetClient: MessagingHelper<ClientDTO | null> =
      await clientService.Get(Number(id));

    if (resultGetClient.success == false) {
      setErrorMessage(resultGetClient.message);
      setSuccessMessage("");
      return;
    }

    var client: ClientEditDTO = {
      name: resultGetClient.obj!.name,
      phoneNumber: resultGetClient.obj!.phoneNumber,
      concurrencyToken: resultGetClient.obj!.concurrencyToken,
      birthday: resultGetClient.obj!.birthday,
    };

    setErrorMessage("");
    setClientToUpdate(client);
    setIsActive(resultGetClient.obj!.isActive);
  };

  const update = async () => {
    var resultUpdate: MessagingHelper<ClientDTO | null> =
      await clientService.Update(Number(id), clientToUpdate!);

    if (resultUpdate.success == false) {
      setErrorMessage(resultUpdate.message);
      setSuccessMessage("");
      return;
    }
    get();
    setSuccessMessage("Client updated successfully");
    setErrorMessage("");
    setClientToUpdate(resultUpdate.obj!);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <Row>
          <Col xl={12}>
            <h1>Edit Client</h1>
          </Col>
        </Row>
      </div>

      <div style={{ width: "20%", marginTop: "2em", display: "inline-block" }}>
        <Row>
          <Col xl={3} className="form-label" style={{ textAlign: "right" }}>
            <label>Name: </label>
          </Col>
          <Col xl={9} className="form-input">
            <input
              type="text"
              value={clientToUpdate?.name ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientToUpdate((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                  birthday: prevState?.birthday ?? null, // Ensure the correct type for birthday
                }))
              }
            />
          </Col>
        </Row>

        <Row>
          <Col xl={3} className="form-label" style={{ textAlign: "right" }}>
            <label>Contact: </label>
          </Col>
          <Col xl={9} className="form-input">
            <input
              type="text"
              value={clientToUpdate?.phoneNumber ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const inputVal = e.target.value.replace(/\D/, ""); 
                if (inputVal.length <= 9) {
                  // Maximum 9 digits (only PT)
                  setClientToUpdate((prevState) => ({
                    ...prevState,
                    phoneNumber: inputVal,
                    birthday: prevState?.birthday ?? null,
                  }));
                }
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col xl={3} className="form-label" style={{ textAlign: "right" }}>
            <label>Birthday: </label>
          </Col>
          <Col xl={9} className="form-input">
            <input
              type="date"
              value={
                clientToUpdate?.birthday
                  ? clientToUpdate.birthday.split("T")[0]
                  : ""
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientToUpdate({
                  ...clientToUpdate,
                  birthday: e.target.value || null,
                })
              }
            />
          </Col>
        </Row>

        <Row>
          <Col xl={4}>
            <button className="btn btn-light btnBackList" onClick={routeChange}>
              ← Back
            </button>
          </Col>

          <Col xl={8}>
            <button
              className="btn btn-primary btnCreateClient"
              onClick={update}
            >
              Update
            </button>
          </Col>
        </Row>

        <Row>
          <ClientStatusComponent
            id={Number(id)}
            isActive={isActive}
            xl={12}
            style={{ width: "100%", marginTop: "1em" }}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </Row>

        {errorMessage && (
          <Row>
            <Col xl={12} className="error">
              {errorMessage}
            </Col>
          </Row>
        )}

        {successMessage && (
          <Row>
            <Col xl={12} className="success">
              {successMessage}
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
