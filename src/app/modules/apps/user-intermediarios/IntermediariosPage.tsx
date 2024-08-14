import React, { useState } from 'react'

interface FormValues {
  nombreEmpresa: string
  rucEmpresa: string
  pais: string
  estado: 'Comprado' | 'Alquilado' | 'Pendiente'
}

const IntermediariosPage: React.FC = () => {
  const [formData, setFormData] = useState<FormValues[]>([])
  const [filterEstado, setFilterEstado] = useState<string>('')
  const [filterPais, setFilterPais] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    const newFormData: FormValues = {
      nombreEmpresa: form.nombreEmpresa.value,
      rucEmpresa: form.rucEmpresa.value,
      pais: form.pais.value,
      estado: form.estado.value as 'Comprado' | 'Alquilado' | 'Pendiente',
    }

    setFormData([...formData, newFormData])
    form.reset()
  }

  const filteredData = formData.filter(data => {
    return (
      (filterEstado === '' || data.estado === filterEstado) &&
      (filterPais === '' || data.pais.toLowerCase().includes(filterPais.toLowerCase()))  &&
      (searchTerm === '' || data.nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} className="p-3">
        <div className="mb-3">
          <label htmlFor="nombreEmpresa" className="form-label">
            Nombre de la Empresa
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreEmpresa"
            name="nombreEmpresa"
            placeholder="Ingrese el nombre de la empresa"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rucEmpresa" className="form-label">
            RUC de la Empresa
          </label>
          <input
            type="text"
            className="form-control"
            id="rucEmpresa"
            name="rucEmpresa"
            placeholder="Ingrese el RUC de la empresa"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pais" className="form-label">
            País
          </label>
          <input
            type="text"
            className="form-control"
            id="pais"
            name="pais"
            placeholder="Ingrese el país"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estado" className="form-label">
            Estado
          </label>
          <select id="estado" name="estado" className="form-select" required>
            <option value="">Seleccione un estado</option>
            <option value="Comprado">Comprado</option>
            <option value="Alquilado">Alquilado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>

      <div className="row mt-4">
        <div className="col-md-4">
          <label htmlFor="filterEstado" className="form-label">
            Filtrar por Estado
          </label>
          <select
            id="filterEstado"
            className="form-select"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Comprado">Comprado</option>
            <option value="Alquilado">Alquilado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="filterPais" className="form-label">
            Filtrar por País
          </label>
          <input
            type="text"
            className="form-control"
            id="filterPais"
            placeholder="Ingrese el país"
            value={filterPais}
            onChange={(e) => setFilterPais(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="searchTerm" className="form-label">
            Buscar por Nombre de Empresa
          </label>
          <input
            type="text"
            className="form-control"
            id="searchTerm"
            placeholder="Ingrese el nombre de la empresa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th>Nombre de la Empresa</th>
            <th>RUC de la Empresa</th>
            <th>País</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{data.nombreEmpresa}</td>
              <td>{data.rucEmpresa}</td>
              <td>{data.pais}</td>
              <td>{data.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IntermediariosPage
