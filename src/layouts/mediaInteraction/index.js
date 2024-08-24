import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSoftUIController } from "context";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Close } from "@mui/icons-material";
import "./mediaInteraction.css";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

function MediaInteraction() {
  const [controller] = useSoftUIController();
  const { sidenavColor } = controller;
  const navigate = useNavigate();

  const [media, setMedia] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let newErrors = {};
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!tags) {
      newErrors.tags = "Tags are required";
    }
    if (!instructions) {
      newErrors.instructions = "Instructions are required";
    }
    if (!media.length) {
      newErrors.media = "At least one media file is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMediaChange = (event) => {
    const newMedia = Array.from(event.target.files);
    setMedia((prev) => [...prev, ...newMedia]);
    setErrors((prev) => ({ ...prev, media: "" }));
  };

  const removeMedia = (index) => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
  };

  const handleSubmit = () => {
    if (validateFields()) {
      setMedia([]);
      setDescription("");
      setTags("");
      setInstructions("");
      setErrors({});
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ marginTop: "20px" }}>
              <SoftBox p={3}>
                <SoftTypography variant="h6" gutterBottom>
                  Add Media
                </SoftTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <label>
                      Upload Media <span>* {errors.media && errors.media}</span>
                    </label>
                    <input
                      accept="image/*,video/*,audio/*"
                      style={{ display: "none" }}
                      id="icon-button-file"
                      type="file"
                      multiple
                      onChange={handleMediaChange}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload media" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    <div className="media-preview">
                      {media.map((file, index) => (
                        <div key={index} className="media-item">
                          <span>{file.name}</span>
                          <IconButton color="primary" onClick={() => removeMedia(index)}>
                            <Close />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <label>
                      Description <span>* {errors.description && errors.description}</span>
                    </label>
                    <textarea
                      rows={5}
                      name="description"
                      className={errors.description ? "errorTextArea" : "textAreaInput"}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors((prev) => ({ ...prev, description: "" }));
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <label>
                      Tags <span>* {errors.tags && errors.tags}</span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="Tags"
                      name="tags"
                      type="text"
                      value={tags}
                      onChange={(e) => {
                        setTags(e.target.value);
                        setErrors((prev) => ({ ...prev, tags: "" }));
                      }}
                      error={Boolean(errors.tags)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <label>
                      Instructions <span>* {errors.instructions && errors.instructions}</span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="Instructions"
                      name="instructions"
                      type="text"
                      value={instructions}
                      onChange={(e) => {
                        setInstructions(e.target.value);
                        setErrors((prev) => ({ ...prev, instructions: "" }));
                      }}
                      error={Boolean(errors.instructions)}
                    />
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="end"
              gap="10px"
              sx={{ marginTop: "20px" }}
            >
              <SoftButton
                variant="gradient"
                color="secondary"
                onClick={() => {
                  navigate("/previousPage"); // Adjust navigation as needed
                }}
              >
                Cancel
              </SoftButton>
              <SoftButton variant="gradient" color={sidenavColor} onClick={handleSubmit}>
                Save
              </SoftButton>
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default MediaInteraction;
