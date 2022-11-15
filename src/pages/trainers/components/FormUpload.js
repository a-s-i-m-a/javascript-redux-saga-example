import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap"
import Dropzone from "react-dropzone"


// Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import { Link } from "react-router-dom"

const FormUpload = ({avatar,newAvatar}) => {
  const [selectedFiles, setselectedFiles] = useState([])

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
    newAvatar(files.preview)
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <React.Fragment>
      <div className="page-conte">
        <Container fluid={true}>
          <Col>
            <div className="top-name center-block text-center">
              <img src={avatar} alt="" className="avatar-xl rounded-circle img-thumbnail"  />
            </div>
          </Col>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <div className="mb-5">
                    <Form>
                      <Dropzone
                        onDrop={acceptedFiles => {
                          handleAcceptedFiles(acceptedFiles)
                          newAvatar(acceptedFiles)
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                              </div>
                              <h4>Перетащите файлы сюда или нажмите, чтобы добавить или изменить фотографию.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div className="dropzone-previews mt-3" id="file-previews">
                        {selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                  <div className="text-center mt-4">
                                    <button
                                      type="button"
                                      className="btn btn-primary waves-effect waves-light"
                                      onClick={()=>newAvatar(f.preview)}
                                    >
                                      Send Files
                                    </button>
                                  </div>
                                </Row>
                              </div>
                            </Card>
                          )
                        })}
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormUpload
