import React, { useEffect, useState } from "react";
import axios from "axios";

interface Casa {
  id: string;
  "casa/apto": string;
  name_resident: string;
  cc_resident: number;
  phone_resident: string;
}

const Casas: React.FC = () => {
  const [casas, setCasas] = useState<Casa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nombre: "",
    cedula: "",
    celular: "",
  });

  useEffect(() => {
    const fetchCasas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Casa[]>("http://127.0.0.1:3000/house", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCasas(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error al cargar las casas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCasas();
  }, []);

  const handleEditClick = (casa: Casa) => {
    setEditData({
      id: casa.id,
      nombre: casa.name_resident,
      cedula: casa.cc_resident.toString(),
      celular: casa.phone_resident,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!editData.id) {
        alert("Error: falta el ID de la casa.");
        return;
      }

      const body = {
        id: editData.id,
        name_resident: editData.nombre,
        cc_resident: Number(editData.cedula),
        phone_resident: editData.celular,
      };

      await axios.put("http://127.0.0.1:3000/house", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCasas((prev) =>
        prev.map((c) =>
          c.id === editData.id
            ? {
                ...c,
                name_resident: editData.nombre,
                cc_resident: Number(editData.cedula),
                phone_resident: editData.celular,
              }
            : c
        )
      );

      setIsModalOpen(false);
      alert("✅ Casa actualizada correctamente");
    } catch (error: any) {
      console.error(error);
      alert("❌ Error al actualizar la casa");
    }
  };

  if (isLoading) return <p>Cargando casas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="casas-view">
      <div className="table-container">
        <table className="casas-table">
          <thead>
            <tr>
              <th>Casa/Apto</th>
              <th>Nombre residente</th>
              <th>Cédula</th>
              <th>Celular</th>
              <th className="actions-column">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {casas.length > 0 ? (
              casas.map((casa) => (
                <tr key={casa.id}>
                  <td>{casa["casa/apto"]}</td>
                  <td>{casa.name_resident}</td>
                  <td>{casa.cc_resident}</td>
                  <td>{casa.phone_resident}</td>
                  <td className="actions-column">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(casa)}
                      title="Editar casa"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No hay casas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h2>Editar Información</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <div className="modal-divider"></div>

            <div className="modal-content">

              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={editData.nombre}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Número de Cédula</label>
                <input
                  type="text"
                  name="cedula"
                  value={editData.cedula}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Número de Celular</label>
                <input
                  type="text"
                  name="celular"
                  value={editData.celular}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="edit-button" onClick={handleSave}>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Casas;
