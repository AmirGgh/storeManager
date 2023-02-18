import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addNewObj } from "./utilsDB";
import { useToggle } from "../../utils/displayDataUi";

import "firebase/storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWith: { xs: 400, sm: 600, md: 900 },
  maxHight: { xs: 400, sm: 600, md: 900 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// get one customer and state for component
const AddNewProduct = (props) => {
  const [open, setOpen] = useState(true);
  const [AddProduct, setAddProduct] = useState({});
  const [imageUpload, setImageUpload] = useState(null);
  const [inputs, setInputs] = useToggle();
  const [upload, setUpload] = useToggle();
  const [uploading, setUploading] = useToggle();

  // upload new image to storage, and save link and location of image.
  async function uploadImage() {
    const storage = getStorage();
    const refImg = `${Date.now()}-${imageUpload.name}`;
    const link = `images/${refImg}`;
    const storageRef = ref(storage, link);
    uploadBytes(storageRef, imageUpload).then((snapshot) => {
      setUploading();
      alert("Image Uploaded!");
      getDownloadURL(ref(storage, link)).then((url) => {
        setAddProduct({ ...AddProduct, img: url, refImg: link });
        setInputs();
      });
    });
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!inputs) {
          props.closeAddProd();
        }
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography>Add New Product</Typography>
        {!inputs && (
          <>
            {!upload && (
              <Button variant='contained' component='label'>
                Choose Image
                <input
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                    setUpload();
                  }}
                  hidden
                  accept='image/*'
                  multiple
                  type='file'
                />
              </Button>
            )}
            {upload && (
              <>
                {!uploading && (
                  <Button
                    variant='contained'
                    onClick={() => {
                      setUploading();
                      uploadImage();
                    }}
                  >
                    Upload Image
                  </Button>
                )}
                {uploading && (
                  <Typography color={"green"}>Uploading...</Typography>
                )}
              </>
            )}
          </>
        )}
        {inputs && (
          <Box>
            <Box>
              <TextField
                sx={{ margin: 1 }}
                id='1'
                label='Product Name'
                variant='filled'
                onChange={(e) =>
                  setAddProduct({ ...AddProduct, name: e.target.value })
                }
              />
              <TextField
                sx={{ margin: 1 }}
                id='2'
                label='Price'
                variant='filled'
                onChange={(e) =>
                  setAddProduct({ ...AddProduct, price: e.target.value })
                }
              />
              <TextField
                sx={{ margin: 1 }}
                id='3'
                label='Quantity'
                variant='filled'
                onChange={(e) =>
                  setAddProduct({ ...AddProduct, quantity: e.target.value })
                }
              />
            </Box>
            <Box>
              <TextField
                id='multiline-flexible'
                label='Details'
                multiline
                fullWidth
                sx={{ margin: 1 }}
                maxRows={4}
                onChange={(e) =>
                  setAddProduct({ ...AddProduct, details: e.target.value })
                }
              />
            </Box>
            <Button
              sx={{ margin: 1 }}
              variant='contained'
              component='label'
              onClick={() => {
                addNewObj(AddProduct, "Products");
                setOpen(!open);
              }}
            >
              Add
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default AddNewProduct;
