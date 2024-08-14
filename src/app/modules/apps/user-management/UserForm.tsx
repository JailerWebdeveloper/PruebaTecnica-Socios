import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Form as BootstrapForm, Col, Row } from 'react-bootstrap'
import Select from 'react-select'

interface ISOOption {
  value: string
  label: string
}

interface FormValues {
  auditor: string
  iso: ISOOption | null
  otro: string
  pais: string
  comentario: string
  archivo: File | null
}

const isoOptions: ISOOption[] = [
  { value: 'ISO9001', label: 'ISO 9001' },
  { value: 'ISO14001', label: 'ISO 14001' },
  { value: 'ISO27001', label: 'ISO 27001' },
  // Añadir más opciones según sea necesario
]

const validationSchema = Yup.object().shape({
  auditor: Yup.string().required('El auditor/implementador es requerido'),
  iso: Yup.object().nullable().required('La ISO es requerida'),
  otro: Yup.string(),
  pais: Yup.string().required('El país de implementación es requerido'),
  comentario: Yup.string(),
  archivo: Yup.mixed().required('El archivo adjunto es requerido'),
})

interface UsersFormProps {
  onSubmit: (values: FormValues) => void
}

const UsersForm: React.FC<UsersFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        auditor: '',
        iso: null,
        otro: '',
        pais: '',
        comentario: '',
        archivo: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values)
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <Row className="mb-3">
            <Col>
              <BootstrapForm.Label>Auditor / Implementador</BootstrapForm.Label>
              <Field name="auditor" type="text" as={BootstrapForm.Control} />
              <ErrorMessage name="auditor" component="div" className="text-danger" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Label>ISO</BootstrapForm.Label>
              <Select
                options={isoOptions}
                name="iso"
                onChange={(option) => setFieldValue('iso', option)}
              />
              <ErrorMessage name="iso" component="div" className="text-danger" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Label>Otro</BootstrapForm.Label>
              <Field name="otro" type="text" as={BootstrapForm.Control} />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Label>País de implementación de la ISO</BootstrapForm.Label>
              <Field name="pais" type="text" as={BootstrapForm.Control} />
              <ErrorMessage name="pais" component="div" className="text-danger" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Label>Comentario</BootstrapForm.Label>
              <Field name="comentario" as="textarea" rows="3" className="form-control" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Label>Archivo adjunto</BootstrapForm.Label>
              <input
                name="archivo"
                type="file"
                onChange={(event) => {
                  setFieldValue('archivo', event.currentTarget.files?.[0] || null)
                }}
                className="form-control"
              />
              <ErrorMessage name="archivo" component="div" className="text-danger" />
            </Col>
          </Row>

          <Button type="submit">Enviar</Button>
        </Form>
      )}
    </Formik>
  )
}

export default UsersForm
