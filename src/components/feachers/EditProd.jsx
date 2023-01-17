import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { deleteProduct, update } from "./utilsDB";
import CustomerOfProduct from "./customerOfProduct";
import { styleBoxModal } from "../../utils/displayDataUi";

import "firebase/storage";
import { useToggle } from "../../utils/displayDataUi";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const EditProd = (props) => {
  const { products, purchases } = useContext(AppContext);
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(!open);
  const [updateProd, setUpdateProd] = useState({});
  const { [0]: product } = products.filter((p) => p.id === props.editProdId);
  const [imageUpload, setImageUpload] = useState(null);
  const [updates, setUpdates] = useToggle();
  // upload new image, and delete the old one from storage.
  // Also save link and location of the new image.
  async function uploadImage() {
    const storage = getStorage();
    const refImg = `${Date.now()}-${imageUpload.name}`;
    const link = `images/${refImg}`;

    const storageRef = ref(storage, link);
    if (props.refImg) {
      deleteImg(props?.refImg);
    }
    uploadBytes(storageRef, imageUpload).then(() => {
      alert("Image Uploaded!");
      getDownloadURL(ref(storage, link)).then((url) => {
        setUpdateProd({ ...updateProd, img: url, refImg: link });
      });
    });
  }
  // delete img ref - in update/ delete from store
  const deleteImg = () => {
    const storage = getStorage();
    const delRef = ref(storage, props.refImg);
    deleteObject(delRef)
      .then(() => {
        alert("Product Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!updates) {
          handleClose();
          props.closeEdit();
        }
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styleBoxModal}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Edit Product - {product.name}
        </Typography>
        <Typography>kb,m ,</Typography>
        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Change Image</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ margin: 1 }}>
                {!updates && (
                  <Button variant='contained' component='label'>
                    Choose Image
                    <input
                      onChange={(e) => {
                        setImageUpload(e.target.files[0]);
                        setUpdates();
                      }}
                      hidden
                      accept='image/*'
                      multiple
                      type='file'
                    />
                  </Button>
                )}
                {updates && (
                  <Button
                    variant='contained'
                    onClick={() => {
                      uploadImage();
                    }}
                  >
                    Upload Image
                  </Button>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>Edit Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <TextField
                  sx={{ margin: 1 }}
                  id='filled-basic'
                  label='Prodact Name'
                  variant='filled'
                  defaultValue={product.name}
                  onChange={(e) =>
                    setUpdateProd({ ...updateProd, name: e.target.value })
                  }
                />
                <TextField
                  sx={{ margin: 1 }}
                  id='filled-basic'
                  label='Price'
                  variant='filled'
                  defaultValue={product.price}
                  onChange={(e) =>
                    setUpdateProd({ ...updateProd, price: e.target.value })
                  }
                />
                <TextField
                  sx={{ margin: 1 }}
                  id='filled-basic'
                  label='Quantity'
                  variant='filled'
                  defaultValue={product.quantity}
                  onChange={(e) =>
                    setUpdateProd({ ...updateProd, quantity: e.target.value })
                  }
                />
              </Box>
              <Box>
                <TextField
                  id='multiline-flexible'
                  label='Details'
                  multiline
                  fullWidth
                  maxRows={4}
                  defaultValue={product.details}
                  onChange={(e) =>
                    setUpdateProd({ ...updateProd, details: e.target.value })
                  }
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>Customers Of This Product</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CustomerOfProduct
                id={product.id}
                editCustomer={props.editCustomer}
                handleClose={handleClose}
                closeEdit={props.closeEdit}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box>
          <Button
            onClick={() => {
              props.closeEdit();
              update(updateProd, props.editProdId, "Products");
            }}
            sx={{
              backgroundColor: "primary.light",
              "&:hover": { backgroundColor: "primary.green" },
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              props.closeEdit();
              deleteProduct(product.id, purchases);
              deleteImg();
            }}
            sx={{
              backgroundColor: "primary.light",
              "&:hover": { backgroundColor: "primary.red" },
              margin: 1,
            }}
          >
            Delete From Store
          </Button>
        </Box>
        <br />
      </Box>
    </Modal>
  );
};

export default EditProd;
