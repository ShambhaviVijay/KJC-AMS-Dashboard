import Modal from 'react-bootstrap/Modal';
import FacultyForm from './FacultyForm'
import VenOrgForm from './VenOrgForm'
import DeleteForm from './DeleteForm';
import AdminForm from './AdminsForm';

function DetailsModal({modalShow, closeModel, action, page, refresh, data = [], id, idList, departments, clubs, deleteFunction}) {

  const customDialogClassName = 'custom-modal-dialog';
  const openFacultyForm = () => <FacultyForm data={data} action={action} closeModel={closeModel} refresh={refresh} idList={idList} departments={departments} clubs={clubs}/> 
  const openVenDptOrgForm = () => <VenOrgForm data={data} page={page} action={action} closeModel={closeModel} refresh={refresh} idList={idList} />
  const openDeleteForm = () => <DeleteForm page={page} closeModel={closeModel} refresh={refresh} deleteId={id} deleteFunction={deleteFunction} />
  const openAdminForm = () => <AdminForm data={data} page={page} action={action} closeModel={closeModel} refresh={refresh} idList={idList} />

  return (
    <>
      <Modal
        show={modalShow}
        onHide={closeModel}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>{action + " " + page}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {action === 'Delete'?openDeleteForm():
          (page === 'Faculty'?openFacultyForm() :
            (page === 'Admin' || page === 'Super Admin'? openAdminForm():
          openVenDptOrgForm()))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DetailsModal;