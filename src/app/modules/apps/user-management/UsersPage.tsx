import React, { useState } from 'react'

interface FormValues {
  auditor: string
  iso: string
  otro: string
  pais: string
  comentario: string
  archivo: File | null
}

const UsersPage: React.FC = () => {
  const [formData, setFormData] = useState<FormValues[]>([])
  const [isOtroDisabled, setIsOtroDisabled] = useState(true)
  const [filterISO, setFilterISO] = useState('')
  const [filterPais, setFilterPais] = useState('')

  const handleISOChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setIsOtroDisabled(value !== '')
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    const newFormData: FormValues = {
      auditor: form.auditor.value,
      iso: form.iso.value,
      otro: form.otro.value,
      pais: form.pais.value,
      comentario: form.comentario.value,
      archivo: form.archivo.files[0] || null,
    }

    setFormData([...formData, newFormData])
    form.reset()
    setIsOtroDisabled(true)
  }

  const filteredData = formData.filter((data) => {
    return (
      (filterISO === '' || data.iso === filterISO) &&
      (filterPais === '' || data.pais.toLowerCase().includes(filterPais.toLowerCase()))
    )
  })

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} className="p-3">
        <div className="mb-3">
          <label htmlFor="auditor" className="form-label">
            Auditor / Implementador
          </label>
          <input
            type="text"
            className="form-control"
            id="auditor"
            name="auditor"
            placeholder="Ingrese el nombre del auditor/implementador"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="iso" className="form-label">
            ISO
          </label>
          <select
            id="iso"
            name="iso"
            className="form-select"
            required
            onChange={handleISOChange}
          >
            <option disabled value="">Seleccione una ISO</option>
            <option value="ISO 9001">ISO 9001</option>
            <option value="ISO 14001">ISO 14001</option>
            <option value="ISO 27001">ISO 27001</option>
            <option value="">Otro</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="otro" className="form-label">
            Otro
          </label>
          <input
            type="text"
            className="form-control"
            id="otro"
            name="otro"
            placeholder="Especifique otro requerimiento"
            disabled={isOtroDisabled}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pais" className="form-label">
            País de implementación de la ISO
          </label>
          <input
            type="text"
            className="form-control"
            id="pais"
            name="pais"
            placeholder="Ingrese el país de implementación"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="comentario" className="form-label">
            Comentario
          </label>
          <textarea
            className="form-control"
            id="comentario"
            name="comentario"
            rows={3}
            placeholder="Agregue un comentario (opcional)"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="archivo" className="form-label">
            Archivo adjunto
          </label>
          <input
            type="file"
            className="form-control"
            id="archivo"
            name="archivo"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>

      <div className="filters mt-4">
        <div className="mb-3">
          <label htmlFor="filterISO" className="form-label">
            Filtrar por ISO
          </label>
          <select
            id="filterISO"
            className="form-select"
            value={filterISO}
            onChange={(e) => setFilterISO(e.target.value)}
          >
            <option value="">Todas las ISO</option>
            <option value="ISO 9001">ISO 9001</option>
            <option value="ISO 14001">ISO 14001</option>
            <option value="ISO 27001">ISO 27001</option>
          </select>
        </div>

        <div className="mb-3">
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
      </div>

      <table className="table table-striped table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th>Auditor / Implementador</th>
            <th>ISO</th>
            <th>Otro</th>
            <th>País de implementación</th>
            <th>Comentario</th>
            <th>Archivo adjunto</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{data.auditor}</td>
              <td>{data.iso}</td>
              <td>{data.otro}</td>
              <td>{data.pais}</td>
              <td>{data.comentario}</td>
              <td>
                {data.archivo && (
                  <a
                    href={URL.createObjectURL(data.archivo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={data.archivo.name}
                  >
                    {data.archivo.name}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
