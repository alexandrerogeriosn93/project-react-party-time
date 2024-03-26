/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import partyFetch from "../axios/config";

import useToast from "../hook/useToast";

import "./Party.css";

const Party = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);

      setParty(res.data);
    };

    loadParty();
  }, []);

  const handleDelete = async () => {
    const res = await partyFetch.delete(`/parties/${id}`);

    if (res.status === 200) {
      navigate("/");
      useToast(res.data.msg);
    }
  };

  if (!party) return <p>Carregando...</p>;

  return (
    <div className="party">
      <h1>{party.title}</h1>
      <div className="actions-container">
        <Link className="btn" to={`/party/edit/${party._id}`}>
          Editar
        </Link>
        <button className="btn-secondary" onClick={handleDelete}>
          Excluir
        </button>
      </div>
      <p>Orçamento: R${party.budget}</p>
      <h3>Serviços contratados</h3>
      <div className="services-container">
        {party.services.map((service) => (
          <div className="service" key={service._id}>
            <img src={service.image} alt={service.name} />
            <p>{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Party;
